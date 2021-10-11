package com.example.quickreview1;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.google.android.material.textfield.TextInputEditText;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void handlerClickButton(View view){
        //find the controls: button, textbox, label
        EditText txtName = findViewById(R.id.editTextTextPersonName);
        TextView lablel = findViewById(R.id.textView);
        String name = txtName.getText().toString();
        if(name.length()==0){
            txtName.setError("Name is required!");
        }else{
            lablel.setText("Hello "+ name);
        }

    }
}