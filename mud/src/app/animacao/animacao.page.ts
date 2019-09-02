import { AlertController } from '@ionic/angular';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-animacao',
  templateUrl: './animacao.page.html',
  styleUrls: ['./animacao.page.scss'],
})
export class AnimacaoPage implements OnInit {

  constructor(private dadosService: DadosService,private AlertController: AlertController,  private router: Router) { }
  
  public counter = 0;
  public timer;

  ngOnInit() {
    this.animacao();
    let horas="";
    let dia = new Date().getDay();
    let mes = new Date().getMonth();
    let ano = new Date().getFullYear();
    let hora = new Date().getHours();
    let minuto = new Date().getMinutes();
    let segundo = new Date().getSeconds();
    horas=ano+"-"+mes+"-"+dia+" "+hora+":"+minuto+":"+segundo;
    this.dadosService.setCrise_hr_inicio(horas);
    console.log(this.dadosService.getCrise_hr_inicio());
    
    //this.mandaAlerta();
  }

  ngOnDestroy()
  {
    clearInterval( this.timer );
  }

  para()
  {
    clearInterval( this.timer );
  }

  animacao()
  {
    var contatempo = 0;
    var teste = 124;
    var chegou = 0;
    var fonte = 14;
    var aux = 0;
    var opacidade = 1;  
    this.timer = setInterval(function() {
      if( chegou == 0){
        teste+=3;
        opacidade-=0.023;
        fonte+=1;
        document.getElementById("circulo").style.width=+teste+'px';
        document.getElementById("circulo").style.height=+teste+'px';
        document.getElementById("inspire").style.fontSize=+fonte+'px';
        document.getElementById("inspire").style.color='rgba(255, 255, 255,'+opacidade+')';
        if( teste == 268)
        {
          chegou = 1;
          document.getElementById("inspire").style.display='none';
          document.getElementById("inspire").style.fontSize='124px';
          document.getElementById("expire").style.display='unset';
        }
      }
      if( chegou == 1)
      {
        aux++;
        if( aux == 5)
        {
          chegou = 2;
          aux = 0;
          opacidade = 1;
        }
      }
      if( chegou == 2){
        teste-=2;
        opacidade-=0.015;
        if((teste % 4) == 0)
        {
          fonte-=1;
        }
        document.getElementById("circulo").style.width=+teste+'px';
        document.getElementById("circulo").style.height=+teste+'px';
        document.getElementById("expire").style.fontSize=+fonte+'px';
        document.getElementById("expire").style.color='rgba(255, 255, 255,'+opacidade+')';
        if(teste == 124)
        {
          chegou = 0;
          document.getElementById("expire").style.display='none';
          document.getElementById("inspire").style.display='unset';
          fonte = 14;
          opacidade = 1;
        }
      }
      contatempo++;
    }, 75);
  }

   async vaiRelatCrise()
  {
    
      const alert = await this.AlertController.create({
        message: 'Já está se sentindo melhor?',
        buttons: [
          {
            text: 'Não',
          }, {
            text: 'Sim',
            handler: () => {
              this.router.navigateByUrl('/relatorio-crise');
              clearInterval( this.timer );
            }
          }
        ]
      });
      return await alert.present();
  
  }

  async mandaAlerta()
  {
    await new Promise(resolve => setTimeout(resolve, 540000));
      const alert = await this.AlertController.create({
        header: 'Ajuda',
        message: 'Você já está na respiração há algum tempo, deseja contatar alguém?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              this.mandaAlerta();
            }
          }, {
            text: 'Sim',
            handler: () => {
              this.router.navigateByUrl('/relatorio-crise');
              clearInterval( this.timer );
            }
          }
        ]
      });
      return await alert.present();
    }
    
}
