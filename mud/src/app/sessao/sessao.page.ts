import { Component, OnInit } from '@angular/core';

import { BancoService } from "../banco.service";
import { DadosService } from "../dados.service";

import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { AlertController } from '@ionic/angular';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.page.html',
  styleUrls: ['./sessao.page.scss'],
})
export class SessaoPage implements OnInit {

  dados;
  db:BancoService;
  zbarOptions: ZBarOptions;
  qr: ZBar;
  hash;

  updateSessao(hash, id)
  {
    return new Promise((resolve, reject) => {
      
      let sql = "UPDATE public.sessao SET" +
        "status = 1, " +  
        "usuario_id = " + id + ", "
        "updated_at = now() " +  
        ");";

      this.db.updateGenerico(sql).then((response) => {

        console.log(response);
        resolve(true);
      })
      .catch((ex) => {
        
        if (ex.error.text == "sucesso") {
        
          resolve(true);
        } 
        else {
        
          resolve(false);
        }
      });
    });
  }

  /**
   * procura pela exsitecia de uma sssao no banco a partir de um hash
   *  
   * @param hash o hash a ser buscado
   * @returns a existencia da sessao no bacno
   */
  buscaSessao(hash)
  {
    return new Promise((resolve, reject) => {
      let sql = " SELECT hash FROM sessao WHERE hash = '" + hash + "' AND status = 0;";

      this.db.selectGenerico(sql).then(response => {
        
        if (response[0].hash !== null) {
          
          resolve(true);
        } else {
          
          resolve(false);
        }
      }).catch(ex => {
        
        resolve(false);
      });
    });
  }

  /**
   * scanFoda
   * 
   * liga a camera pra ler o qrcode, e dps valida e ativa a sessao no banco
   */
  async scanFoda(){
    //leitura do codigo
    this.qr.scan(this.zbarOptions)
    //sucesso
    .then(result => {

      this.hash = result;
    })
    //erro
   .catch(error => {
     
      alert(error);
      this.hash = "return";
    });

    //if erro, retorna
    if(this.hash == "return"){

      return;
    }

    //validacao
    if(!(await this.buscaSessao(this.hash))){
      
      return;
    }
    
    this.updateSessao(this.hash, /*this.dados.getDados("id")*/ "2");
    

  }

  constructor(db: BancoService, dados: DadosService, qr: ZBar) 
  {  
    this.db = db;
    this.dados = dados;
    this.qr = qr;
    this.zbarOptions = {
      text_title: "scanner",
      text_instructions: "aponte sua camera para o QR-code",
      camera: "back",
      flash: "off",
      drawSight: true
    }
  }

  ngOnInit() 
  {
    
  }

}
