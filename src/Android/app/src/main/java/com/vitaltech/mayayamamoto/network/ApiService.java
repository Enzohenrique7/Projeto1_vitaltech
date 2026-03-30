package com.vitaltech.mayayamamoto.network;

import com.vitaltech.mayayamamoto.model.LoginRequest;
import com.vitaltech.mayayamamoto.model.LoginResponse;
import com.vitaltech.mayayamamoto.model.Usuarios;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {

    // Rotas da API
    @POST("cadastrarPaciente")
    Call<Usuarios> cadastrar(@Body Usuarios usuarios);

    @POST("login")
    Call<LoginResponse> logar(@Body LoginRequest login);
}