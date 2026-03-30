package com.vitaltech.mayayamamoto.activity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearSnapHelper;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.SnapHelper;

import com.google.android.material.carousel.CarouselLayoutManager;
import com.vitaltech.mayayamamoto.adapter.CarouselAdapter;
import com.vitaltech.mayayamamoto.R;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private RecyclerView carouselRecyclerView;
    private CarouselAdapter adapter;
    private int currentIndex = 0;

    // Mudar as imagens carrossel automaticamente a cada 3 segundos
    private final Handler autoScrollHandler = new Handler();
    private final int AUTO_SCROLL_INTERVAL = 3000; // milisegundos

    Button btStart, btLogin;

    Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        btStart = findViewById(R.id.btStart);
        btLogin = findViewById(R.id.btLogin);

        btStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                intent = new Intent(MainActivity.this, CadastroActivity.class);
                startActivity(intent);
            }
        });

        btLogin.setOnClickListener(v -> {
            intent = new Intent(MainActivity.this, LoginActivity.class);
            startActivity(intent);
        });

        // Carrossel
        carouselRecyclerView = findViewById(R.id.recyclerView);

        // Setup Carousel Layout Manager
        CarouselLayoutManager carouselLayoutManager = new CarouselLayoutManager();
        carouselRecyclerView.setLayoutManager(carouselLayoutManager);

        List<Integer> images = Arrays.asList(
                R.drawable.psicossomatica,
                R.drawable.kabat,
                R.drawable.massagem
        );

        // Conecta a lista de imagens com a RecylcerView
        adapter = new CarouselAdapter(images);
        carouselRecyclerView.setAdapter(adapter);

        // Faz com que o carrossel trave no no item central
        SnapHelper snapHelper = new LinearSnapHelper();
        snapHelper.attachToRecyclerView(carouselRecyclerView);

        // Pausa o autoscroll quando o usuario esta interagindo, e volta quando o usuario não esta mais interagindo
        carouselRecyclerView.setOnTouchListener((v, event) -> {
            switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    stopAutoScroll();
                    break;
                case MotionEvent.ACTION_UP:
                case MotionEvent.ACTION_CANCEL:
                    startAutoScroll();
                    break;
            }
            return false;
        });

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }

    private void startAutoScroll(){
        autoScrollHandler.postDelayed(autoScrollRunnable, AUTO_SCROLL_INTERVAL);
    }

    private void stopAutoScroll(){
        autoScrollHandler.removeCallbacks(autoScrollRunnable);
    }

    @Override
    protected void onResume(){
        super.onResume();
        startAutoScroll();
    }

    @Override
    protected void onPause() {
        super.onPause();
        stopAutoScroll();
    }

    private final Runnable autoScrollRunnable = new Runnable() {
        @Override
        public void run() {
            if (adapter.getItemCount() == 0) return;

            currentIndex = (currentIndex + 1) % adapter.getItemCount();
            carouselRecyclerView.smoothScrollToPosition(currentIndex);

            autoScrollHandler.postDelayed(this, AUTO_SCROLL_INTERVAL);
        }
    };
}