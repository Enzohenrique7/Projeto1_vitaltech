package com.vitaltech.mayayamamoto;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {

    @POST("cadastrarPaciente")
    Call<Usuarios> cadastrar(@Body Usuarios usuarios);

    @POST("login")
    Call<LoginResponse> logar(@Body LoginRequest login);
}
