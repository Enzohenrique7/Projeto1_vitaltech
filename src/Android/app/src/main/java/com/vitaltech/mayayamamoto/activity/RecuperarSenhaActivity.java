package com.vitaltech.mayayamamoto.activity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.vitaltech.mayayamamoto.R;

public class RecuperarSenhaActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Liga este código Java ao XML activity_recuperar_senha
        setContentView(R.layout.activity_recuperar_senha);

        // Referencia os componentes do XML para usarmos depois
        EditText editEmail = findViewById(R.id.editTxtEmailRecuperacao);
        Button btnEnviar = findViewById(R.id.btEnviarCodigo);

        // Exemplo de ação ao clicar em enviar (para teste futuro)
        btnEnviar.setOnClickListener(v -> {
            String email = editEmail.getText().toString();
            Toast.makeText(this, "Código enviado para: " + email, Toast.LENGTH_LONG).show();
        });
    }
}