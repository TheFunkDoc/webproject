console.log("Holla!");

//main function that is called in multiple cases
function refreshTable(callback) {
        $.get("http://wt.ops.few.vu.nl/api/c36f52e3",function(data){
            
            //store recieved data in a variable
            var JSONdata = data;
            //console.log(JSONdata);
            
            //clear previous content
            $('#mainTbody').empty();
            
            //fill table with fresh data
            $.each(JSONdata,function(){
                
                var tbody = document.getElementById("mainTbody");
                var newLine = document.createElement("tr");
            
                tbody.insertBefore(newLine,tbody.childNodes[0]);
                var currentInputLine = this;
                //console.log(currentInputLine);
                
                $.each(currentInputLine,function(index,element){
                    if(index!="id")
                        {
                            var newBox = document.createElement("td");
                            newLine.appendChild(newBox);
                            //console.log(this);
                            
                            var element_p = document.createElement("p");
                            var elText = document.createTextNode(this);
                            
                            element_p.appendChild(elText);
                            
                            newBox.appendChild(element_p);
                        }
                });
            })        
        });
    callback();
    };
 
//makes get request for "reset" case
function resetGet(callback)
{
    $.get("http://wt.ops.few.vu.nl/api/c36f52e3/reset",function(){
            
        callback();
    });
               
    return true;
    };

//
$(function() {
    var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		
		var links = this.el.find('.Title');
		
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.Content').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), false);
});

//function changes body color to red, then changes the "display" value of "notnow" <a> element, making it accesible 
function changeBodyBgRed() {
    document.body.style.backgroundColor = "red";
    console.log("Bg set to red");
    
    overrideLink.style.display = "inline";
    console.log("link displayed");
    
};

//overrides the behavior of an element by removing it's "href" value
function cancelLink(){
        overrideLink.removeAttribute("href");
        console.log("Attribute removed. Enjoy your horrible design choices.");
    };

$(document).ready(function(){
    refreshTable( function(){
       $("#sellingList").tablesorter();
    });
    return true;
});
    
//reset button event 
$('#resetBtn').on('click',function(){
    resetGet(function(){
        refreshTable(function(){
            console.log("Table reseted.")
        });
    }) 
});

    
    
//submit button event
$(document).on('submit', '#submitEmAll',function(e){
        
        //disabling redirect
        e.preventDefault();
        
        //create object containing data from forms
        var toSend = {
            date: $("#date").val(),
            name: $("#name").val(),
            category: $("#category").val(),
            location: $("#location").val(),
            amount: $("#amount").val()
        };

        //post ajax call and call refreshtable function 
        $.post("http://wt.ops.few.vu.nl/api/c36f52e3", toSend,function(){
            refreshTable(function(){
            console.log("Table updated.")
        });
        }, 'json');
         
        return false;
        
    });



//when a th is clicked, the table sorts
$('th').on('click', function(){
    $("#sellingList").trigger("update"); 
})


//clears default value of textbox
$('input[type="text"]').on('click',function(){
    if($('input[type="text"]').val() == "...?")
        {
            $('input[type="text"]').val("");
        }
});

$('#bgRed').on('click', function(){
    changeBodyBgRed();
});

$('#notnow').on('click', function(){
    cancelLink();
});




















































//{"category": "Fruit", "name": "Banana", "amount": 15, "location": "Amsterdam", "date": "2014-10-05", "id": 18233}
//{"name":"dcasvasv","category":"fdacvdav","location":"vsafea","amount":"3","date":"2017-01-01"}