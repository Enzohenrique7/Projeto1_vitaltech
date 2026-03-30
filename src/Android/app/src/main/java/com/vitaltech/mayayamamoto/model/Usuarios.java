package com.vitaltech.mayayamamoto.model;

public class Usuarios {
    private int id;
    private String nome;
    private String email;
    private String hash_senha;
    private String data_nascimento;
    private String telefone;

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getHash_senha() {
        return hash_senha;
    }

    public String getData_nascimento(){
        return data_nascimento;
    }

    public String getTelefone(){
        return telefone;
    }

    public Usuarios(String nome, String email, String hash_senha, String data_nascimento, String telefone) {
        this.nome = nome;
        this.email = email;
        this.hash_senha = hash_senha;
        this.data_nascimento = data_nascimento;
        this.telefone = telefone;
    }

    public Usuarios(String email, String hash_senha){
        this.email = email;
        this.hash_senha = hash_senha;
    }
}
