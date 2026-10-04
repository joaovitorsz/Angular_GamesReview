import { Component, signal } from '@angular/core';
import { FormsModule, ɵNgNoValidate } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  avaliadorNovaAvaliacao = "";
  jogoNovaAvaliacao = "";
  notaNovaAvaliacao = 0;
  generoNovaAvaliacao = "";
  comentarioNovaAvaliacao = "";
  mensagemAlerta = "";
  tipoAlerta = "";

  jogosAgrupados: any[] = [];


//------------Função mensagem de alerta------------


  mostrarAlerta(mensagem: string, tipo: string){
    this.mensagemAlerta = mensagem;
    this.tipoAlerta = tipo;
  } 


//------------Função gravar avaliação------------


  gravarAvaliacao() {

  //Validações de campos em branco

    if(this.avaliadorNovaAvaliacao.trim() === ""){
      this.mostrarAlerta("O mundo quer saber quem você é!. Insira seu nome. 😬", "erro");
      document.getElementById("avaliadorNovaAvaliacao")?.focus();
      return;
    }

    if(this.jogoNovaAvaliacao.trim() === ""){
      this.mostrarAlerta("Precisamos saber qual jogo você está avaliando! Insira o nome do jogo. 😬", "erro");
      document.getElementById("jogoNovaAvaliacao")?.focus();
      return;
    }

    if(this.notaNovaAvaliacao < 0 || this.notaNovaAvaliacao > 10) {
      this.mostrarAlerta("Insira um valor de 0 a 10 para a nota! 😬", "erro");
      document.getElementById("notaNovaAvaliacao")?.focus();
      return;
    }

    if(this.generoNovaAvaliacao.trim() === ""){
      this.mostrarAlerta("Não se esqueça do gênero do jogo que está avaliando! 😬", "erro");
      document.getElementById("generoNovaAvaliacao")?.focus();
      return;
    }

    if(this.comentarioNovaAvaliacao.trim() === ""){
      this.mostrarAlerta("Uma avaliação não pode ser completa sem um comentário! 😬", "erro");
      document.getElementById("comentarioNovaAvaliacao")?.focus();
      return;
    }

  //Gravar avaliação

    const jogoNovo = this.jogoNovaAvaliacao.trim().toLowerCase();
    const jogoExistente = this.jogosAgrupados.find(j => j.titulo === jogoNovo);

    const novaAvaliacao = {
      avaliador: this.avaliadorNovaAvaliacao,
      nota: this.notaNovaAvaliacao,
      genero: this.generoNovaAvaliacao,
      comentario: this.comentarioNovaAvaliacao
    };

    if(jogoExistente) {
      jogoExistente.avaliacoes.push(novaAvaliacao);
    } else {
      this.jogosAgrupados.push({
        titulo: jogoNovo,
        expandido: false,
        avaliacoes: [novaAvaliacao]
      });
    }

    this.avaliadorNovaAvaliacao = "";
    this.jogoNovaAvaliacao = "";
    this.notaNovaAvaliacao = 0;
    this.generoNovaAvaliacao = "";
    this.comentarioNovaAvaliacao = "";


    this.mostrarAlerta("Avaliação registrada com sucesso! 😉", "sucesso");


  }

}


