package com.animations

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.util.Log
import androidx.core.app.ActivityCompat.startActivityForResult
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.provider.Settings


class PopupModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "PopupModule"

    @ReactMethod
    fun showPopup(message: String) {
    Log.d("PopupModal", "Popup message: $message")

        val intent = Intent(reactApplicationContext, PopupActivity::class.java)
        intent.putExtra("message", message)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);  // Clear any previous activity
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);  // Ensure activity is launched in a new task

        reactApplicationContext.startActivity(intent)
}

    @ReactMethod
     fun redirectToOverlaySettings() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Log.d("PopupModule","${Build.VERSION.SDK_INT} >= ${Build.VERSION_CODES.M}")
            val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package: com.animations"))
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.addFlags(Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
            reactApplicationContext.startActivity(intent)
        }
    }
}