
    //estructurar todo el codigo en una clase
    class jprogress{
        
        constructor(context,signo){



            this.signo =  signo;

            //crear el contexto
            this.contente = $(context)[0];


            this.contente.style.position = "relative";

            //create canvas en contente
           // this.canvas = document.querySelector(canvas);



            //si no exite contexto ignorar canvas y label y crar un contexto en body
            if(!this.contente){
                this.contente = document.body;
            }


            //si no exite label crear label
            if(!this.label){

                //crear label

            
                this.label = $("<label></label>")[0]

   

                //label 50% 50%
                this.label.style.position = "absolute";
                this.label.style.top = "50%";
                this.label.style.left = "50%";
                this.label.style.transform = "translate(-50%,-50%)";
                //
                this.label.style.fontSize = "30px";
                
                //fon san
                this.label.style.fontFamily = "calibri";


                //this.label.style.fontFamily = "Apple SD Gothic Neo";
                //color
                this.label.style.color = "white";

                
                $(context).append(this.label);
            }


       
            //this.canvas = document.querySelector(canvas);

            //create canvas en contente
            this.canvas = document.createElement("canvas");

            this.contente.appendChild(this.canvas);

            this.ctx = this.canvas.getContext("2d");

            
            
            this.canvas.width = 300;
            this.canvas.height = 300;

            this.x = this.canvas.width / 2;
            this.y = this.canvas.height / 2;
            this.radio = 80;
            this.startAngle = 0;
            this.endAngle = 2 * Math.PI;
            this.anticlockwise = false;


            this.color1 = "rgba(0,0,255,.5)";
            this.color2 = "rgba(255,0,0,1)";


            this.temPorcentaje = 0;


            this.timeTween = 50;


            this.shadowColor = "rgba(3,33,33,.5)";


            this.shadowBlur = 10;
    
            
        }

        setAngle(angle){
            this.angleUser = angle || 0;
        }

        setColors(color1,color2){
            this.color1 = color1;
            this.color2 = color2;
        }

        convertToRadians(degree){
            return degree * (Math.PI / 180);
        }

        map(value, start1, stop1, start2, stop2) {
            return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
        }
        
        Arc(endAngle,anticlockwise,angleObjet){
            
          //clear canvas

            //clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //dibujar arco
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radio, this.startAngle, endAngle, anticlockwise);
            this.ctx.lineWidth = 25;
            //this.ctx.strokeStyle = "#FF0000";

            //de derecha a izquierda
            var gradient = this.ctx.createLinearGradient(this.canvas.width,0,0,0);

            gradient.addColorStop("0",this.color1); //rgba(255,0,255,1)
            //gradient.addColorStop("0.5","rgba(255,0,255,0)");
            gradient.addColorStop("1.0",this.color2);

            this.ctx.strokeStyle = gradient;

            //protitype
            

            this.ctx.stroke();

            //sumar color1 y color2
            

            //crear sombra para arc
            this.ctx.shadowColor = this.shadowColor;
            this.ctx.shadowBlur = this.shadowBlur;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;


       
        }


        setShadowColor(color){
            this.shadowColor = color;
        }

        setShadowBlur(blur){
            this.shadowBlur = blur;
        }
        drawCircle(porcentaje,angleObjet){


            if(porcentaje < 0){
                porcentaje  = 0;
            }


            if(porcentaje >= 100){
                porcentaje = 100;
            }


  
            //convertir el porcentaje a angulo

            var angle = this.map(porcentaje,0,100,0,360);
            

            var endAngle = this.convertToRadians(angle);
            
            var anticlockwise = false;
            
                        
            this.Arc(endAngle,anticlockwise,angleObjet);

            //rotate canvas css
            //$(this.canvas).css("transform","rotate("+angleObjet+"deg)");

            //transform css  this.canvas

            this.canvas.style.transform = "rotate("+angleObjet+"deg)";

            //rotate canvas js

            

            porcentaje = Math.round(porcentaje);

            if( this.signo != ""){
                
            }else{
                this.signo = "%";
            }

          

            //ContentProgressLabel
            this.label.innerHTML = porcentaje + this.signo;

            this.temPorcentaje = porcentaje;
            
        }



        tween(final){


            final =  Math.floor(final);

            //actual position

            var initial = this.ActualPorcentaje(initial);

            var interval = setInterval(()=>{

                if(initial < final){
                    initial += 1;
                }else{
                    initial -= 1;
                }

                this.drawCircle(initial,this.angleUser);

                if(initial == final){
                    clearInterval(interval);
                }

            },this.timeTween);

        }

        ActualPorcentaje(){
            return this.temPorcentaje;
        }

        setTimeTween(time){
            this.timeTween = time;
        }
        
        ///
        setColorLabel(color){

            //this.label.style.color = color

            this.label.style.color =color;

        }

        setColorLabelShadow(color){

            
            //this.label.style.textShadow =  "0px 0px 10px " + color;
            $(this.label).css({
                "textShadow":"0px 0px 30px "+color
            });

        }
    
};
