package com.vitaltech.mayayamamoto.activity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.vitaltech.mayayamamoto.network.ApiService;
import com.vitaltech.mayayamamoto.model.LoginRequest;
import com.vitaltech.mayayamamoto.model.LoginResponse;
import com.vitaltech.mayayamamoto.R;
import com.vitaltech.mayayamamoto.network.RetrofitClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    ApiService api = RetrofitClient.getRetrofit().create(ApiService.class);

    EditText editTxtEmail, editTxtSenha;

    Button btEntrar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.login);

        editTxtEmail = findViewById(R.id.editTxtEmail);
        editTxtSenha = findViewById(R.id.editTxtSenha);

        btEntrar = findViewById(R.id.btEntrar);

        btEntrar.setOnClickListener(v -> {
            // Pegando dados do Login
            String emailStr = editTxtEmail.getText().toString().trim();
            String senhaStr = editTxtSenha.getText().toString().trim();

            LoginRequest login = new LoginRequest(emailStr, senhaStr);

            // Chamando a funcao da API
            api.logar(login).enqueue(new Callback<LoginResponse>() {
                @Override
                public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(getApplicationContext(), "Login feito!", Toast.LENGTH_SHORT).show();

                        Intent intent = new Intent(LoginActivity.this, TrilhaExerciciosActivity.class);
                        startActivity(intent);

                    } else {
                        Toast.makeText(getApplicationContext(), "Erro: " + response.code(), Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<LoginResponse> call, Throwable t) {
                    Toast.makeText(getApplicationContext(), "Falha: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        });
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.login), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}
