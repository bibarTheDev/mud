<?php session_start();?><header class="cabecalho"> <h1> <img src="img\mud_logo.svg" alt="" srcset="" class="logo"> </h1> <button class="btn-nav-show" onclick="nav_show()" onmouseover="onmouseover_color('.btn-nav-show > i','#165044ff')" onmouseout="onmouseout_color('.btn-nav-show > i','rgb(38, 187, 157)')"> <i class="fas fa-align-justify"></i> </button> <nav class="lista-cabecalho"> <ul class="menu_ul_top nav_internal_top"> <li><button class="btn-basic btn-nav-close" onclick="nav_close()" onmouseover="onmouseover_color('.btn-nav-close > i','#165044ff')" onmouseout="onmouseout_color('.btn-nav-close > i','rgb(38, 187, 157)')"><i class="fas fa-chevron-right"></i></button></li> </ul> <ul class="menu_ul_bottom flex_column nav_internal_buttom"> <li><a href="#" onclick="muda_session('page','home.php')"><i class="fas fa-home"></i>HOME</a></li> <li><a href="#" onclick="muda_session('page','especialista.php')"><i class="fas fa-brain"></i>ESPECIALISTA</a></li> <li><a href="#" onclick="muda_session('page','config.php')"><i class="fas fa-cog"></i>CONFIGURAR</a></li> <?php if(isset($_SESSION['id_usuario'])):?><li id="l-login"><a href="#" onclick=""><?php echo strtoupper($_SESSION['nome']);?><script>localStorage.setItem('login',!0);</script><i class="fas fa-caret-down"></i></a></li><li id="l-desloga"><a href="./api/exit.php" onclick="localStorage.removeItem('login');"><i class="fas fa-arrow-alt-circle-left"></i>DESLOGAR</a></li><?php else:?><li><a href="#" onclick="var login = new window_mud();login.Modal('LOGIN','#form-l',1,'w-p-default',true,'.cabecalho');$('#form-l').css({'display':'grid'});"><i class="fas fa-user"></i>LOGIN </a></li><?php endif; ?> </ul> <form action="./api/" method="POST" class="form-default" id="form-l" onsubmit="bb = new Usuario;bb.SubmitLogin();"> <label for="nome-l" class="label-input label-l"> <input type="text" placeholder="&nbsp;" name="nome-l" id="nome-l" required> <span>nome</span> </label> <label for="senha-l" class="label-input label-l"> <input type="text" placeholder="&nbsp;" name="senha-l" id="senha-l" required> <span>senha</span> </label> <input type="hidden" name="acao" value="1"> <input type="hidden" name="json" id="form-l-json"> <div class="form-submit" id="div-l"> <label for="limpar" class="label-input "> <input type="reset" placeholder="&nbsp;" value="cancelar" id="limpar-l" required> </label> <label for="enviar-l" class="label-input"> <input type="submit" placeholder="&nbsp;" value="enviar" id="enviar-l" required> </label> </div> </form> </nav></header><div class="corrige"></div>