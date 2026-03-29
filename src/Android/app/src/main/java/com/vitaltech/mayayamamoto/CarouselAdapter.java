package com.vitaltech.mayayamamoto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class CarouselAdapter extends RecyclerView.Adapter<CarouselAdapter.CarouselViewHolder> {
    // Lista de imagens
    private final List<Integer> imageList;

    public CarouselAdapter(List<Integer> imageList){
        this.imageList = imageList;
    }

    @NonNull
    @Override
    public CarouselViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType){
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_carousel,
                parent, false);
        return new CarouselViewHolder(view);
    }

    // O que exibe a imagem na tela pra cada item
    @Override
    public void onBindViewHolder(@NonNull CarouselViewHolder holder, int position) {
        holder.imageView.setImageResource(imageList.get(position));
    }

    @Override
    public int getItemCount(){
        return imageList.size();
    }

    static class CarouselViewHolder extends RecyclerView.ViewHolder{
        ImageView imageView;

        // Celula do carrossel
        public CarouselViewHolder(@NonNull View itemView) {
            super(itemView);
            imageView = itemView.findViewById(R.id.imageView);
        }
    }
}
