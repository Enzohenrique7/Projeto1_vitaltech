package com.vitaltech.mayayamamoto.activity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.vitaltech.mayayamamoto.adapter.ExercicioAdapter;
import com.vitaltech.mayayamamoto.model.Exercicios;
import com.vitaltech.mayayamamoto.R;

import java.util.ArrayList;

public class TrilhaExerciciosActivity extends AppCompatActivity {
    TextView txtOla;
    Intent intent;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_trilha_exercicios);

        RecyclerView recycler = findViewById(R.id.recyclerExercicios);

        ArrayList<Exercicios> lista = new ArrayList<>();

        // Adicionando objetos na lista
        lista.add(new Exercicios("Postura em Pé", "desc", "2x ao dia", R.drawable.postura_em_pe));
        lista.add(new Exercicios("Alongamento", "desc", "1x ao dia", R.drawable.alongamento));
        lista.add(new Exercicios("Respiração", "desc", "3x ao dia", R.drawable.respiracao));

        ExercicioAdapter adapter = new ExercicioAdapter(this, lista);

        recycler.setLayoutManager(new LinearLayoutManager(this));
        recycler.setAdapter(adapter);

        txtOla = findViewById(R.id.txtOla);

        /* String nomeRecebido = getIntent().getStringExtra("nome");

        txtOla.setText("Olá, " + nomeRecebido); */

    }
}
