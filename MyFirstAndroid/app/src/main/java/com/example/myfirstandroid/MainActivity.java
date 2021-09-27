package com.example.myfirstandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import java.util.Random;

public class MainActivity extends AppCompatActivity {

    //will handle the click of the button
    public void openGreeting(View view){
        Intent intent = new Intent(this,GreetingActivity.class);
        startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //to find the View goodMorningLabel
        TextView goodMorning =  findViewById(R.id.goodMorningLabel);
        //create a random number from 0 to 100
        Random r = new Random();
        int grade = r.nextInt(100);
        grade  += 1;
        //set the Text for the View which we found previously
        goodMorning.setText("Halo Mr. A!");
        if (grade > 50){
            goodMorning.append("\nWell done! Your grade is: " + grade);
        }else{
            goodMorning.append("\nSorry try again! Your grade is: " + grade);
        }

    }
}