package com.example.myfirstandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class GreetingActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_greeting);
    }
    public void sayHi(View view){
        EditText text = findViewById(R.id.editTextTextPersonName);
        //get user text
        String name = text.getText().toString();

        //Toast toast = Toast.makeText(this,"Hello " + name,Toast.LENGTH_SHORT);
        //toast.setGravity(Gravity.CENTER,0,0);
        //toast.show();
        if (name.trim().length()==0){
            //show error
            text.setError("You have to enter the name first!");
        }else{
            TextView textView = findViewById(R.id.textView);
            textView.setText("Hello " + name);
        }

    }
}