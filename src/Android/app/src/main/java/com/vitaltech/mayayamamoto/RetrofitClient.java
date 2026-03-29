package com.vitaltech.mayayamamoto;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    // Endereco do servidor
    private static final String BASE_URL = "http://10.0.2.2:5000/";
    // Instancia unica do Retrofit
    private static Retrofit retrofit;

    public static Retrofit getRetrofit() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    // Define o endereco da API
                    .baseUrl(BASE_URL)
                    // Transforma o JSON em objetos Java, utilizando o GSON
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}