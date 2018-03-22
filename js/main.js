/*alert(1);*/ //for testing the page

//listen for form submit
document.getElementById("myForm").addEventListener('submit', saveBookmark);

/*save bookmark*/
function saveBookmark(e) {/*passing an event parameter i.e, e*/
	//Get form values
	var siteName=document.getElementById('siteName').value;
	var siteUrl=document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}


	/*console.log(siteName);*/

	/*console.log("it works");*/

	/*to prevent default behaviour of the form("pevent form from submitting")*/
	
	var bookmark = {
		name: siteName,
		url: siteUrl		
	}

	/*
	//Local storage Test
	localStorage.setItem('test', 'hello world');
	console.log(localStorage.getItem('test'));
	console.log(localStorage.removeItem('test'));

	*/

// test if bookmark is null
	if(localStorage.getItem('bookmarks') === null){
		//init array
		var bookmarks = [];
		//Add to bookmark
		bookmarks.push(bookmark);
		//set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));/*JSON.stringify-- to save json array as string*/
	}else{
		// Get Bookmarks from localStorage
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));/*JSON.parse-- to convert string to jason array*/
		// Add bookmark to array
		bookmarks.push(bookmark);
		//Re-set back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	//clear form
	document.getElementById('myForm').reset();
	//Re-fetchy bookmarks
		fetchBookmarks();

	e.preventDefault();/*using preventDefault() method */
}


// Delete bookmark
function deleteBookmark(url){
	/*console.log(url);*/
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	//Loop trough bookmarks
	for(var i=0; i< bookmarks.length;i++){
		if(bookmarks[i].url == url){
			//Remove from array
			bookmarks.splice(i,1);
		}
	
	}
	//Re-set back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		//Re-fetchy bookmarks
		fetchBookmarks();
}

//Fetch Bookmarks

function fetchBookmarks(){
	// Get Bookmarks from localStorage
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

		/*console.log(bookmarks);*/

		//get output id
		var bookmarksResults = document.getElementById('bookmarksResults');

		//Build Output
		bookmarksResults.innerHTML = '';

		for(var i = 0; i <bookmarks.length; i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarksResults.innerHTML += '<div class="card card-inverse">'+'<h3>'+name +' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> '+'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +'</h3>'+'</div>'+'<br />';
		}
}

function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert('please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('please use a valid url');
		return false;
	}

	return true;
}