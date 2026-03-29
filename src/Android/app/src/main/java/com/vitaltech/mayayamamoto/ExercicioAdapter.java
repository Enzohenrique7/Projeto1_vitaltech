package com.vitaltech.mayayamamoto;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class ExercicioAdapter extends RecyclerView.Adapter<ExercicioAdapter.ViewHolder> {

    // Contem todos os exercicios que serao exibidos, armazenados em uma lista
    ArrayList<Exercicios> lista;
    // Acessar recursos do android
    Context context;

    public ExercicioAdapter(Context context, ArrayList<Exercicios> lista) {
        this.context = context;
        this.lista = lista;
    }

    // Celula da lista
    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txtNome, txtFrequencia;
        ImageView imgExercicio;

        public ViewHolder(View itemView) {
            super(itemView);
            txtNome = itemView.findViewById(R.id.txtNome);
            txtFrequencia = itemView.findViewById(R.id.txtFrequencia);
            imgExercicio = itemView.findViewById(R.id.imgExercicio);
        }
    }

    // Cria a View da celula
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_exercicios, parent, false);
        return new ViewHolder(view);
    }

    // Liga os dados do objeto com os elementos da celula
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Exercicios ex = lista.get(position);

        holder.txtNome.setText(ex.getNomeExercicio());
        holder.txtFrequencia.setText(ex.getFrequencia());
        holder.imgExercicio.setImageResource(ex.getImgExercicio());

        // Quando clicar, vai para outra tela, pegando somente o nome do exercicio
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, DetalheActivity.class);

            intent.putExtra("nome", ex.getNomeExercicio());

            context.startActivity(intent);
        });
    }

    // Informa pro RecyclerView quantos itens existem na lista
    @Override
    public int getItemCount() {
        return lista.size();
    }
}
