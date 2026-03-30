package com.vitaltech.mayayamamoto.activity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.vitaltech.mayayamamoto.R;

public class DetalheActivity extends AppCompatActivity {
    ImageView img;
    TextView nome, descricao;
    Button btVoltar;

    // Mini carrossel provisorio
    int[] imagens = {R.drawable.inspirar1, R.drawable.segurar2, R.drawable.expirar3};

    int index = 0;
    ImageView imgArrowRight, imgArrowLeft;

    Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalhes);

        img = findViewById(R.id.imgExercicio);
        imgArrowRight = findViewById(R.id.imgArrowRight);
        imgArrowLeft = findViewById(R.id.imgArrowLeft);

        nome = findViewById(R.id.txtNomeExercicio);
        btVoltar = findViewById(R.id.btVoltar);

        String nomeRecebido = getIntent().getStringExtra("nome");
        /* String imagemRecebida = getIntent().getStringExtra("imagem");
        String descricaoRecebida = getIntent().getStringExtra("descricao"); */

        nome.setText(nomeRecebido);

        /*Glide.with(this)
                .load(imagemRecebida)
                .into(img); */

        imgArrowRight.setOnClickListener(v -> {
            index++;

            if(index >= imagens.length){
                index=0;
            }

            img.setImageResource(imagens[index]);
        });

        imgArrowLeft.setOnClickListener(v -> {
            index--;

            if (index <= imagens.length){
                index = 0;
            }

            img.setImageResource(imagens[index]);
        });

        btVoltar.setOnClickListener( v-> {
            intent = new Intent(DetalheActivity.this, TrilhaExerciciosActivity.class);
            startActivity(intent);
        });
    }


}
