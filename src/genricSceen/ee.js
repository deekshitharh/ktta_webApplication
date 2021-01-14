fetch('https://sports-whiz.herokuapp.com/sports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(params)
        
  })