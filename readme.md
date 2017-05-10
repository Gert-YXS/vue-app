# 环境需求 nodejs、cordova、AndroidStudio
    java andriod sdk 及环境变量的配置自行百度
## 默认你环境安装ok了 

 一、创建一个cordova工程

　　cordova create cordovaVue

　　cd cordovaVue

config.xml -包含应用相关信息，使用到的插件以及面向的平台

platforms - 包含应用运行平台如 Android 和 iOS 上对应的 Cordova 库

plugins - 包含应用所需插件的 Cordova 库，使得应用能够访问例如照相机和电池状态相关的事项。

www - 包含应用源代码，例如 HTML, JavaScript 和 CSS 文件

hooks - 包含为个性化应用编译系统所需的脚本
 

## 二、添加安卓平台

　　cordova platform add android --save

## 检测检查整体环境是否正确，注意查看提示
 cordova requirements

## 三、引入f-elm 的项目在config/index.js文件中修改build配置项。在vue项目中生成编译完成的源文件

　　npm run build

    在f-elm 下运行后就可以看到www 文件下生成的文件了

## 四、在cordova项目中创建Android应用

　　cordova build android

## 五、将手机连接在电脑上，运行该 Android 程序

　　cordova run android
    用数据线连上电脑之后（注意手机开启调试模式）默认安装好apk并打开

## 六、release 打包过程
    Android app 的打包流程大致分为 build , sign , align 三部分。

    build是构建 APK 的过程，分为 debug 和 release 两种。release 是发布到应用商店的版本
    sign是为 APK 签名。不管是哪一种 APK 都必须经过数字签名后才能安装到设备上，签名需要对应的证书（keystore），大部分情况下 APK 都采用的自签名证书，就是自己生成证书然后给应用签名。

    align是压缩和优化的步骤，优化后会减少 app 运行时的内存开销。

    debug 版本的的打包过程一般由开发工具（比如 Android Studio）自动完成的。开发工具在构建时会自动生成证书然后签名，不需要我们操心。

    release 版本则需要开发者自己生成证书文件。

    先 生成一个release 包
        cordova build --realease
    1. 先生成一个数字签名文件（keystore）。这个文件只需要生成一次。以后每次 sign 都用它。

        keytool -genkey -v -keystore release-key.keystore -alias vue-app -keyalg RSA -keysize 2048 -validity 10000

        生成一个 release-key.keystore 的文件，别名（alias）为 vue-app 。

        过程中会要求设置 keystore 的密码和 key 的密码。我们分别设置为 xxx123 和 xxx123 。这四个属性要记牢，下一步有用。

    2. 用下面的命令对 APK 签名了：
        jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key.keystore platforms/android/build/outputs/apk/android-debug.apk vue-app

    3. 最后我们要用 zipalign 压缩和优化 APK ：
        zipalign -v 4 platforms/android/build/outputs/apk/android-debug.apk platforms/android/build/outputs/apk/vue-app.apk
        这一步会生成最终的 APK，我们把它命名为 vue-app.apk 。它就是可以直接上传到应用商店的版本。

    Cordova 允许我们建立一个 build.json 配置文件来简化操作。文件内容如下：
```javascript
        {
        "android": {
            "release": {
            "keystore": "release-key.keystore",
            "alias": "vue-app",
            <!--"storePassword": "testing",-->
            <!--"password": "testing"-->

            }
        }
        }
```
下次就可以直接用 cordova build --release 

为了安全性考虑，建议不要把密码放在在配置文件或者命令行中，而是手动输入。
你可以把密码相关的配置去掉，下次 build 过程中会弹出一个 Java 小窗口，提示你输入密码。

对 APK 签名
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key.keystore platforms/android/build/outputs/apk/android-release.apk vue-app

最后我们要用 zipalign 压缩和优化 APK ：
(这里有问题)
zipalign -v 4 platforms/android/build/outputs/apk/android-release.apk platforms/android/build/outputs/apk/vue-app.apk
## 出现的问题及解决
    1.使用Cordova编译Android平台程序提示：Could not reserve enough space for 2097152KB object heap
    2017-01-07 20:01 by slmk, 741 阅读, 1 评论, 收藏, 编辑
    大体的意思是系统内存不够用，创建VM失败。试了网上好几种方法都不行，最后这个方法可以了：

    开始->控制面板->系统->高级设置->环境变量->系统变量

    新建变量：
    变量名: _JAVA_OPTIONS   
    变量值: -Xmx512M
    2. 证书的问题：
        mkdir "%ANDROID_HOME%\licenses"
        echo |set /p="8933bad161af4178b1185d1a37fbf41ea5269c55" > "%ANDROID_HOME%\licenses\android-sdk-license"

    3. Failed to install the following SDK components:
        [Android SDK Platform 25]
        The SDK directory (C:\Program Files (x86)\Android) is not writeable,
        please update the directory permissions.

        用管理员权限运行android sdk 下的 sdk manage 安装缺失的组件（Android SDK Platform 25相关的）

参考：
    http://blog.csdn.net/xxx9001/article/details/52056530
    http://www.cnblogs.com/sharpall/p/6780311.html

