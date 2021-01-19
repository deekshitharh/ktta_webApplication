fetch('https://sports-whiz.herokuapp.com/sports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(params)
        
  })



  {ELEMENT_DATA.map((row, index) => {
    return  Object.keys(row).map((o, i) => {
       
return(
        <TableRow key={index}>
          <TableCell
            classes={{ root: classes.drawtable }}
            align="center"
            component="th"
            scope="row"
          >
           {row[o]}
          </TableCell>
     
        </TableRow>
      )

      })



    