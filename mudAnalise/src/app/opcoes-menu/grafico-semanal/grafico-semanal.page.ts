import { Component, OnInit, ViewChild } from '@angular/core';

import { BancoService } from '../../servicos/banco.service';
import { DadosService } from '../../servicos/dados.service';

import { Chart } from "chart.js";
import { colorSets } from '@swimlane/ngx-charts/release/utils';

@Component({
  selector: 'app-grafico-semanal',
  templateUrl: './grafico-semanal.page.html',
  styleUrls: ['./grafico-semanal.page.scss'],
})
export class GraficoSemanalPage implements OnInit 
{
  //dados do paciente (service)
  paciente;
  //dados do paciente (banco)
  semana;
  alimentacao;
  hidratacao;
  lazer;
  sono;
  //controle da view
  semKey;
  //grafico
  grafObj;
  grafSel;
  @ViewChild("grafico") grafElem;
  //observações
  obs
  obsData

  /**
   * gera uma cor aleatoria
   * 
   * @returns string comm a cor em hexdec
   */
  randColor(){
    let vals = "0123456789ABCDEF"
    let cor = "#";
    for (let i = 0; i < 6; i++) {
      cor += vals[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  /**
   * converte int pra float pQ O ANGULAR NAO CONSEGUE LIDAR COM TIPOS
   * (tambem atualiza a view)
   */
  changeOpt()
  {
    this.semKey = Number.parseInt(this.semKey);
    this.changeGraf();
  }

  /**
   * altera o grafico com base no escolhido
   */
  changeGraf()
  {
    let dataset = [];
    
    //preenche o dataset condicionalmente
    switch(this.grafSel) {
      //case alimentacao
      case "alim":{
        let first = true; 
        this.obs = false;

        //itera sobre cada semana
        this.alimentacao.forEach((sem) => 
        { 
          let i = 0;
          //itera sobre cada indice da semana
          for (var key in sem) { //"foreach"
            if (sem.hasOwnProperty(key)) {
              let value = sem[key];
            
              //if for a primeira vez, cria objeto de dataset
              if(first){     
                dataset.push({
                  label: key,
                  data: [value],
                  borderColor: this.randColor(),
                  fill: false,
                  borderWidth: 1
                });
              }
              //else so add o valor no dataset correspondente
              else{
                dataset[i].data.push(value);
              }
              i++;
            }
          }
          first = false;
        });
        break;
      }
      //case lazer
      case "lazr":{
        this.obs = true;
        let i = 0;
        console.log(this.lazer);
        
        //itera sobre cada semana 
        this.lazer.forEach((sem) => 
        { 
          //datset secundario pra observaoces
          this.obsData.push({
            "semana": this.semana[i].data_inicial,
            "value": sem.comentario
          });

          //dataset principal pro grafico
          //if for a primeira vez, cria objeto de dataset
          if(i == 0){     
            dataset.push({
              label: "frequencia",
              data: [sem.vezes],
              borderColor: this.randColor(),
              fill: false,
              borderWidth: 1
            });
          }
          //else so add o valor no dataset correspondente
          else{
            dataset[0].data.push(sem.vezes);
          }
          
          i++;
        });
        break;
      }
      //case hidratacao
      case "hidr":{
        this.obs = false;
        let i = 0;
        console.log(this.hidratacao);
        
        //itera sobre cada semana
        this.hidratacao.forEach((sem) => 
        {
          //if for a primeira iter cria o objeto dataset
          if(i == 0){
            dataset.push({
              label: "frequencia",
              data: [sem.hidratacao],
              borderColor: this.randColor(),
              fill: false,
              borderWidth: 1
            });
          }
          //else apenas pusha valor
          else{
            dataset[0].data.push(sem.vezes);
          }

          i++;
        });
        break;
      }
      //case sono
      case "sono":{
        console.log(this.sono);
        break;
      }
    }

    //console.log(dataset);

    let grafStuff = {
      type: 'bar',
      data: {
        //labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: dataset
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };

    //cria um objeto grafico caso nao existe
    if(this.grafObj == null){
      this.grafObj = new Chart(this.grafElem.nativeElement, grafStuff);
    }
    //else limpa o obj grafico e add o novo dataset
    else{
      console.log("yare yare");
      this.grafObj.data.datasets = dataset;
      this.grafObj.update();
    }
  }

  /**
   * a partir de um id de um usuario, pega todas as semanas, e para cada semana,
   * pega todos os dados relacionados a aquela semana semana
   * 
   * @param id o id do usuario
   */
  pegaDados(id)
  {
    let sql = "SELECT sem.data_inicial, sem.observacao, " +
      "ali.carboidratos, ali.proteinas, ali.laticinios, ali.verd_frut, ali.hidratacao, " +
      "bem.b_realizou, bem.vezes, bem.comentario, " +
      "son.duracao_sono, son.vezes_acordou, son.acordou_naturalmente " +
      "FROM semana AS sem " +
      "JOIN alimentacao AS ali ON sem.id_semana = ali.semana_id " +
      "JOIN bem_estar AS bem ON sem.id_semana = bem.semana_id " +
      "JOIN sono AS son ON sem.id_semana = son.semana_id " +
      "WHERE sem.usuario_id = " + id + " ";
      "ORDER BY sem.data_inicial; ";

    this.db.selectGenerico(sql)
    .then((resp: any) => 
    {
      this.semana = [];
      this.alimentacao = [];
      this.hidratacao = [];
      this.lazer = [];
      this.sono = [];

      resp.forEach(row => 
      {
        let dataIni = (row.data_inicial).split('-');
        dataIni = dataIni[2] + "/" + dataIni[1] + "/" + dataIni[0];

        //5 pacotes de dados brutos
        this.semana.push({
          "data_inicial": dataIni,
          "observacao": row.observacao
        });
        this.alimentacao.push({
          "carboidratos": row.carboidratos,              
          "proteinas": row.proteinas,              
          "laticinios": row.laticinios,              
          "verd_frut": row.verd_frut,              
        });
        this.hidratacao.push({
          "hidratacao": row.hidratacao                
        });
        this.lazer.push({
          "b_realizou": row.b_realizou,
          "vezes": row.vezes,
          "comentario": row.comentario
        });
        this.sono.push({
          "duracao": row.duracao_sono,
          "acordVezes": row.vezes_acordou,
          "acordNat": row.acordou_naturalmente
        });
      });
    })
    .catch(ex => 
    {
      console.log("err: ", ex);      
    });
  }

  constructor(private db: BancoService, private data: DadosService) 
  {    
    this.grafObj = null;
    this.paciente = this.data.getDados("user_sessao");
    this.pegaDados(this.paciente.id_usuario);
    this.semKey = 0;
    this.obs = false;
    this.obsData = [];
  }

  ngOnInit() { }

  ionViewDidEnter()
  {    
    this.changeGraf();
  }

}
