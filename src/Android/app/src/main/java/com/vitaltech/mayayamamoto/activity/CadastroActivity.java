package com.vitaltech.mayayamamoto.activity;

import android.app.DatePickerDialog;
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
import com.vitaltech.mayayamamoto.R;
import com.vitaltech.mayayamamoto.network.RetrofitClient;
import com.vitaltech.mayayamamoto.model.Usuarios;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CadastroActivity extends AppCompatActivity {

    // Conexao com a api
    ApiService api = RetrofitClient.getRetrofit().create(ApiService.class);

    EditText editTxtNome, editTxtEmail, editTxtSenha, editTextDataNasc, editTxtTelefone;
    Button btCadastro;

    Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.cadastro);

        editTxtNome = findViewById(R.id.editTxtNome);
        editTxtEmail = findViewById(R.id.editTxtEmail);
        editTxtSenha = findViewById(R.id.editTxtSenha);
        editTextDataNasc = findViewById(R.id.editTxtDataNasc);
        editTxtTelefone = findViewById(R.id.editTxtTelefone);

        btCadastro = findViewById(R.id.btCadastro);

        btCadastro.setOnClickListener(v -> {
            // Pegando dados do usuario
            String nomeStr = editTxtNome.getText().toString();
            String emailStr = editTxtEmail.getText().toString();
            String senhaStr = editTxtSenha.getText().toString();
            String data_nasc = editTextDataNasc.getText().toString();
            String telefone = editTxtTelefone.getText().toString();

            // Criando o objeto que vai virar JSON (Onde o GSON vai converter automaticamente)
            Usuarios usuario = new Usuarios(nomeStr, emailStr, senhaStr, data_nasc, telefone);

            // Chamando a funcao da api (enqueue - roda em segundo plano sem travar a aplicacao)
            api.cadastrar(usuario).enqueue(new Callback<Usuarios>() {
                @Override
                public void onResponse(Call<Usuarios> call, Response<Usuarios> response) {
                    // Se a API tiver sucesso
                    if (response.isSuccessful()) {
                        Toast.makeText(getApplicationContext(), "Cadastro feito!", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(CadastroActivity.this, TrilhaExerciciosActivity.class);
                        startActivity(intent);
                        // Se a API nao tiver sucesso
                    } else {
                        Toast.makeText(getApplicationContext(), "Erro: " + response.code(), Toast.LENGTH_SHORT).show();
                    }
                }

                // Se der Falha de conexao
                @Override
                public void onFailure(Call<Usuarios> call, Throwable t) {
                    Toast.makeText(getApplicationContext(), "Falha: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        });


        // Criar calendario no edit text da data de nascimento
        editTextDataNasc.setOnClickListener(v -> {
            Calendar calendar = Calendar.getInstance();

            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH);
            int day = calendar.get(Calendar.DAY_OF_MONTH);

            DatePickerDialog datePicker = new DatePickerDialog(
                    CadastroActivity.this,
                    (view, selectedYear, selectedMonth, selectedDay) -> {
                        String data = String.format("%02d/%02d/%d",
                                selectedDay, selectedMonth + 1, selectedYear);
                        editTextDataNasc.setText(data);
                    },
                    year, month, day
            );

            datePicker.show();
        });

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.cadastro), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}
