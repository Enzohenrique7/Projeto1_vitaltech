package com.vitaltech.mayayamamoto.activity;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.annotation.RequiresPermission;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.vitaltech.mayayamamoto.adapter.ExercicioAdapter;
import com.vitaltech.mayayamamoto.model.Exercicios;
import com.vitaltech.mayayamamoto.R;
import com.vitaltech.mayayamamoto.model.ExerciseResponse;
import com.vitaltech.mayayamamoto.model.Usuarios;
import com.vitaltech.mayayamamoto.network.ApiService;
import com.vitaltech.mayayamamoto.network.RetrofitClient;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TrilhaExerciciosActivity extends AppCompatActivity {
    RecyclerView recycler;
    TextView txtOla, txtHistorico;
    Intent intent;

    Usuarios usuarios;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_trilha_exercicios);

        recycler = findViewById(R.id.recyclerExercicios);
        txtHistorico = findViewById(R.id.txtHistorico);

        ArrayList<Exercicios> lista = new ArrayList<>();

        ExercicioAdapter adapter = new ExercicioAdapter(this, lista);

        recycler.setLayoutManager(new LinearLayoutManager(this));
        recycler.setAdapter(adapter);

        txtOla = findViewById(R.id.txtOla);

        buscarExercicios();

        // Historico de exercicios realizados
        SharedPreferences prefs =
                getSharedPreferences(
                        "checkin",
                        MODE_PRIVATE
                );

        String exercicio =
                prefs.getString(
                        "ultimoExercicio",
                        "Nenhum exercício"
                );

        String data =
                prefs.getString(
                        "ultimaData",
                        ""
                );

        txtHistorico.setText(
                "Último exercício:\n"
                        + exercicio
                        + "\n"
                        + data
        );

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        mostrarNotificacao();
    }

    private void buscarExercicios(){
        ApiService api = RetrofitClient.getRetrofit().create(ApiService.class);

        api.listarExercicios().enqueue(new Callback<ExerciseResponse>() {
            @Override
            public void onResponse(Call<ExerciseResponse> call, Response<ExerciseResponse> response) {
                if(response.isSuccessful() && response.body() != null) {
                    ArrayList<Exercicios> lista = new ArrayList<>(response.body().getData());
                    ExercicioAdapter adapter = new ExercicioAdapter(TrilhaExerciciosActivity.this, lista);

                    recycler.setAdapter(adapter);
                }
            }

            @Override
            public void onFailure(Call<ExerciseResponse> call, Throwable t) {
                Log.e("API", t.getMessage());
            }
        });
    }

    // Notificacoes
    @RequiresPermission(Manifest.permission.POST_NOTIFICATIONS)
    private void mostrarNotificacao() {

        String channelId = "canal_exercicios";

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            NotificationChannel channel =
                    new NotificationChannel(
                            channelId,
                            "Notificações",
                            NotificationManager.IMPORTANCE_DEFAULT
                    );

            NotificationManager manager =
                    getSystemService(NotificationManager.class);

            manager.createNotificationChannel(channel);
        }

        NotificationCompat.Builder builder =
                new NotificationCompat.Builder(this, channelId)
                        .setSmallIcon(R.drawable.ic_launcher_foreground)
                        .setContentTitle("Maya Yamamoto")
                        .setContentText("Hora de fazer seus exercícios!")
                        .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManagerCompat notificationManager =
                NotificationManagerCompat.from(this);

        notificationManager.notify(1, builder.build());
    }
}
