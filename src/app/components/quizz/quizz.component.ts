import { Component, NgModule, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {

  titulo:string="";
  perguntas:any
  pergunta:any
  
  respostas:string[]=[]
  resposta:string=""

  perguntaIndex:number=0
  perguntaMaxIndex:number=0

  terminado:boolean = false;

  ngOnInit(): void {
    console.log("entrou")
    if (quizz_questions)
      this.terminado=false
      this.titulo= quizz_questions.title
      
      this.perguntas= quizz_questions.questions
      this.pergunta=this.perguntas[this.perguntaIndex]

      this.perguntaIndex=0
      this.perguntaMaxIndex=this.perguntas.length


  } 

  escolha(value:string){
    this.respostas.push(value) 
    this.nextStep()  
  }

  async nextStep(){
    this.perguntaIndex+=1
    if(this.perguntaMaxIndex>this.perguntaIndex){
      this.pergunta=this.perguntas[this.perguntaIndex]
    } else {
      const respostaFinal:string = await this.checkResultado(this.respostas)
      this.terminado=true;
      this.resposta = quizz_questions.results[respostaFinal as keyof typeof quizz_questions.results]
    }
  }

  async checkResultado(respostas:string[]){
    const resultado= respostas.reduce((previo,corrente,i,arr)=>{
      if(
        arr.filter(item => item === previo).length > 
        arr.filter(item => item === corrente).length
      ){
        return previo
      }else{
        return corrente
      }  
    })
    return resultado
  }


}
