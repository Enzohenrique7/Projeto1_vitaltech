package com.vitaltech.mayayamamoto.activity;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.RequiresPermission;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.bumptech.glide.Glide;
import com.vitaltech.mayayamamoto.R;
import com.vitaltech.mayayamamoto.model.Exercicios;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DetalheActivity extends AppCompatActivity {
    ImageView img;
    TextView nome, observacao;
    Button btVoltar, btFinalizarExercicio;

    int index = 0;
    ImageView imgArrowRight, imgArrowLeft;

    Intent intent;

    Exercicios ex;

    @RequiresPermission(Manifest.permission.POST_NOTIFICATIONS)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalhes);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            requestPermissions(new String[]{
                    Manifest.permission.POST_NOTIFICATIONS
            }, 100);
        }

        img = findViewById(R.id.imgExercicio);
        imgArrowRight = findViewById(R.id.imgArrowRight);
        imgArrowLeft = findViewById(R.id.imgArrowLeft);

        nome = findViewById(R.id.txtNomeExercicio);
        observacao = findViewById(R.id.txtObservacao);
        btVoltar = findViewById(R.id.btVoltar);
        btFinalizarExercicio = findViewById(R.id.btFinalizarExercicio);

        String nomeRecebido = getIntent().getStringExtra("nome");
        String orientacaoRecebida = getIntent().getStringExtra("orientacoes");
        String imagemRecebida = getIntent().getStringExtra("imagem");

        nome.setText(nomeRecebido);
        observacao.setText(orientacaoRecebida);

        Glide.with(this)
                .load(imagemRecebida)
                .into(img);

        /* imgArrowRight.setOnClickListener(v -> {
            index++;

            if(index >= imagens.length){
                index=0;
            }

            img.setImageResource(imagens[index]);
        }); */

        /*imgArrowLeft.setOnClickListener(v -> {
            index--;

            if (index <= imagens.length){
                index = 0;
            }

            img.setImageResource(imagens[index]);
        }); */

        btFinalizarExercicio.setOnClickListener(v -> {

            String dataAtual = new SimpleDateFormat(
                    "dd/MM/yyyy HH:mm",
                    Locale.getDefault()
            ).format(new Date());

            SharedPreferences prefs =
                    getSharedPreferences(
                            "checkin",
                            MODE_PRIVATE
                    );

            SharedPreferences.Editor editor = prefs.edit();

            editor.putString(
                    "ultimoExercicio",
                    nomeRecebido
            );

            editor.putString(
                    "ultimaData",
                    dataAtual
            );

            editor.apply();

            Toast.makeText(
                    DetalheActivity.this,
                    "Exercício concluído!",
                    Toast.LENGTH_SHORT
            ).show();

            intent = new Intent(DetalheActivity.this, TrilhaExerciciosActivity.class);
            startActivity(intent);

        });

        btVoltar.setOnClickListener( v-> {
            intent = new Intent(DetalheActivity.this, TrilhaExerciciosActivity.class);
            startActivity(intent);
        });
    }
}
