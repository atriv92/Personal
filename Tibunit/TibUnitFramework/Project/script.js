		plotData();
		
		function plotData() {
			var canvas=document.getElementById("canvas"); 	
			var ctx=canvas.getContext("2d");
			canvas.height=(series.length * 30)+ 100 ;
			canvas.width=600;
			var maxPass=Math.max.apply(Math,dataPass);
			var maxFail=Math.max.apply(Math,dataFail);
			var maxArray=[maxPass, maxFail];
			var max=Math.max.apply(Math,maxArray);
			var canvasWidth=canvas.width;
			var canvasHeight=canvas.height;
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			var xAxisStart=100;
			var yAxisStart=50;
			var xAxisEnd=canvas.width -20;
			var yAxisEnd=canvas.height;
			{ 	
				ctx.fillStyle = "blue";
				ctx.lineWidth = "2.0";
				ctx.beginPath();
				ctx.moveTo(xAxisStart, yAxisStart);
				ctx.lineTo(xAxisEnd, yAxisStart);
				ctx.closePath();
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(xAxisStart, yAxisStart);
				ctx.lineTo(xAxisStart, yAxisEnd);
				ctx.closePath();
				ctx.stroke();
			}
			{	
				ctx.fillStyle = "green";	
				ctx.fillRect(5, 5, 10, 10);
				ctx.textAlign = "start";
				ctx.fillStyle = "green";
				ctx.fillText("Pass", 20, 15);
				ctx.fillStyle = "red";	
				ctx.fillRect(5, 15, 10, 10);
				ctx.textAlign = "start";
				ctx.fillStyle = "red";
				ctx.fillText("Fail", 20, 25);
				
			}
			{
				var tickerX=xAxisStart;
				var tickerY=yAxisStart;
				var tickerSpace= (xAxisEnd-xAxisStart ) / max;
				if(tickerSpace < 20) tickerSpace=20;
				var tickerCount = (xAxisEnd-xAxisStart) / tickerSpace ;
				var tickerUnitSize= max/tickerCount ;
				for(var i=1 ; i<=tickerCount ; i++){
					var x = tickerX + (i*tickerSpace);
					if( x > canvasWidth) break;
					ctx.beginPath();
					ctx.moveTo(x, tickerY-5);
					ctx.lineTo(x, tickerY);
					ctx.closePath();
					ctx.stroke();
					ctx.textAlign = "left";
					ctx.fillStyle = "blue";
					ctx.fillText(Math.round(( tickerUnitSize * i )), x-5 , tickerY-10);
				}
				var xpos=xAxisStart + 1;
				var ypos=yAxisStart + 5;
				var seriesBarGap=10;
				var barHeight=10;
				for (var i = 0; i < series.length; i++) { 		
					ctx.textAlign = "end";
					ctx.fillStyle = "blue";
					ctx.fillText(series[i], xpos-10, ypos+10);
					ctx.fillStyle = "green";	
					ctx.fillRect(xpos , ypos , dataPass[i] * tickerSpace/tickerUnitSize  , barHeight);
					ypos +=barHeight;
					ctx.fillStyle = "red";	
					ctx.fillRect(xpos, ypos , dataFail[i] * tickerSpace/tickerUnitSize  , barHeight);
					ypos +=barHeight;
					ypos += seriesBarGap;
				} 
			}
		}