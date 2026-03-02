# Legion AI° ProGuard Rules
-keep class com.facebook.react.** { *; }
-keep class com.legionai.mobile.** { *; }
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}
