package com.animations

import android.app.KeyguardManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity


class PopupActivity:AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true)
            setTurnScreenOn(true)
            val keyguardManager = getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
            keyguardManager.requestDismissKeyguard(this, null)

        }
//        val win = window
//        win.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED)
//        win.addFlags(
//            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
//                    or WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
//                    or WindowManager.LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON
//        )


        // Ensure that the correct layout is set
        setContentView(R.layout.activity_popup)  // Make sure this matches your XML file name

        // Make the popup take full width
        val window = this.window
        window.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)

        // Optional: Set a dim background
        window.setFlags(
            WindowManager.LayoutParams.FLAG_DIM_BEHIND,
            WindowManager.LayoutParams.FLAG_DIM_BEHIND
        )

        // Set a dim amount (optional)
        val layoutParams = window.attributes
        layoutParams.dimAmount = 0.5f // Adjust dim level
        window.attributes = layoutParams

        // Other logic to handle popup

        val message = intent.getStringExtra("message") ?: "No message available"

        // Set the title and message for the popup
        val popupTitle: TextView = findViewById(R.id.popup_title)
        val popupMessage: TextView = findViewById(R.id.popup_message)
        val closeButton: Button = findViewById(R.id.close_button)
        val openButton: Button = findViewById(R.id.open_button)
        popupMessage.text = message

        // Close button functionality
        closeButton.setOnClickListener {
            finish()
            Log.d("PopupAcitivty","Finsih and opening the app $message")
        }
        openButton.setOnClickListener {
            openApp()
        }
    }

    private fun openApp() {
        // Create an intent to launch the main activity of your app
        val launchIntent = Intent(this, MainActivity::class.java)
        launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        startActivity(launchIntent)

        // Close the popup
        finish()
    }
}