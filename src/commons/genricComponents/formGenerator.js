import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { withStyles } from "@material-ui/core/styles";
import {  withRouter } from "react-router-dom";

import customStyles from "../../styles/genricStyle";
///genric form genertor component for provided form schema
class FormGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formList: [],
            data: this.props.data,
            groups:[]
           
        }
    }

    componentDidMount() {
        if (this.props.formList) this.setState({ formList: this.props.formList })
     
    }

    componentDidUpdate(prevProps) {
        if (prevProps.formList !== this.props.formList) {
            if (this.props.formList) this.setState({ formList: this.props.formList })
        }

      
    }
//show hidden password
    handleClickShowPassword = (item) => {
     
        if (!this.props.groups) {
            let formDataInput = [...this.state.formList];
            let showPassword;
            if (item && item.type === "password" && item.showPassword) showPassword = item.showPassword;
            item.showPassword = (!showPassword)
            formDataInput.find(nestedItem => {
                if (nestedItem.key === "password" && nestedItem.key === item.key) nestedItem = item;
            })

            this.setState({ formList: formDataInput })
        }

        else
        {
            let formDataInput = [...this.state.groups];
            let showPassword;
            if (item && item.type === "password" && item.showPassword) showPassword = item.showPassword;
            item.showPassword = (!showPassword)
            formDataInput.map(nestedItem => {
                nestedItem.find((option, index) => {
                    if (option.key === "password" && option.key === item.key) option = item;
                })
               
            })

            this.setState({ groups: formDataInput })  
            }
    }

  

//dropdown data
    showDropDown = (nestedItem) => {
        if (nestedItem && nestedItem.key === "clubNameId") {
  
           // const {registredClub} =this.state
            //let genricData = [];
            this.props.data.forEach(item => {
                nestedItem.options.push({ "value": item.clubName, "key": item.clubName })

            })
            //let x = Object.assign(nestedItem, { "options": genricData }) 
        
            // this.state.registredClub.map(item => {
            //     genricData.push({ "options": { "value": item.clubName, "key": item.clubName } })

            // })
            const dropDownOptions = nestedItem.options.map((option, index) => {
                return (<option key={index} value={option.value} >
                    {option.key}
                </option>)
            })
            return dropDownOptions


         }
        
        else {
            const dropDownOptions = nestedItem.options.map((option, index) => {
                return (<option key={index} value={option.value} >
                    {option.key}
                </option>)
            })
            return dropDownOptions

        }
    }


    render() {

        const { onChange, classes,variant } = this.props;
        const { formList} = this.state;
        
        let content = ""
        if (this.props.groupBy) {
            let md = 12;
            let xs = 12;
            if (this.props.groupBy === 3) md = 4
            if (this.props.groupBy === 2) md = 6
            content = this.props.groups.map((groupItem, groupIndex) => {
                
                return (
                    <Grid container spacing={5}  key={groupIndex} >
                        {groupItem.map((item, index) => {
                            const styleObj = {};
                            if (item.hidden) styleObj["display"] = "none";

                            
                                                   
                                                
                            if (item.upperCase) item.value = item.value.toUpperCase()

                            return (<Grid item xs={xs} md={md} key={index}>
                                <TextField
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu
                                        }
                                    }}
                                    id="component-simple"
                                    margin="normal"
                                   
                                    fullWidth
                                    disabled={item.disabled ? true : false}
                                    variant={variant ? variant : "outlined"}
                                    select={item.select}
                                    autoComplete="off"
                                    label={item.displayName ? item.displayName :""}
                                    name={item.key}
                                    value={item.value}
                                    onChange={onChange}
                                    multiline={item.multiline}
                                    style={styleObj}
                                    rowsMax={item.rowsMax}
                                   //disabled={!editMode || item.disabled}
                                    rows={item.rows}
                                    type={(item.type !== "select" && item.type !== "password") ? item.type : ((item.type === "password" && item.showPassword) ? 'text' : 'password')}
                                    format="dd/mm/yyyy"
                                    error={(item.error && item.error.length) ? true : false}
                                    helperText={item.error}
                                    InputProps={{
                                        endAdornment: (
                                            (item.type === "password") ? (<InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => this.handleClickShowPassword(item)}
                                                >
                                                    {item.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>

                                            </InputAdornment >) : false
                                        ),
                                    }
                                    }
                                    InputLabelProps={{ shrink: true }}>
                                    {(item.select ) ? (
                                        this.showDropDown(item)
                                    ) : ''}
                                   


                                </TextField>
                               

                            </Grid >)
                        })}</Grid>)
            })
        }
        else {
            content = formList.map((item, index) => {
                const styleObj = {};
               
                if (item.hidden) styleObj["display"] = "none";
              
                return (
                  
                    <React.Fragment>
                    <TextField
                    id={item.key}
                    select={item.select}
                    key={index}
                            variant={variant? variant:"outlined"}
                    //type={item.type}
                    disabled={item.disabled ? true : false}
                    hidden={item.hidden ? true : false}
                            label={item.displayName ? item.displayName :""}
                    name={item.key}
                    type={(item.type !== "select" && item.type !== "password") ? item.type : ((item.type === "password" && item.showPassword) ? 'text' : 'password')}
                    fullWidth
                         
                    margin="normal"
                    value={item.value}
                    onChange={onChange}
                    error={(item.error && item.error.length) ? true : false}
                    helperText={item.error}
                    autoComplete="off"
                    style={styleObj}
                    rows={item.rows}
                    multiline={item.multiline}
                    rowsMax={item.rowsMax}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        endAdornment: (
                            (item.type === "password") ? (<InputAdornment position="end">
                                <IconButton
                                    onClick={() => this.handleClickShowPassword(item)}
                                >
                                    {item.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                 
                            </InputAdornment >) : false
                        ),
                    }
                    }

                    >
                      

                            {(item.select) ? (
                        this.showDropDown(item)
                    ) : ''}
                        </TextField>
                   
                      



                       
                    
                    </React.Fragment>
                   
                   
                    
                    
                )
              
                
            })
             
            
           

          
        }



        return content
    }

}

export default withRouter(withStyles(customStyles)(FormGenerator));


