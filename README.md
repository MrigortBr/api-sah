
# Api


## Rotas

### Rotas de Auth

#### Rota register
```
Route: /register
Method: PUT
Body: {
    "name": "igor pereira lins",
    "password": "Ig@rt1227",
    "email": "igortbr@hotmail.com",
    "cpf"?: "12960159470",
    "number"?: "997938091"
}

```

#### Rota de login
```
Route: /login
Method: POST
Body: {
    "password": "Ig@rt1227",
    "email": "igortbr@hotmail.com",
    "remember"?: true //deixa mais tempo logado
}

```

#### Request reset password
```
Route: /reset
Method: POST
Body: {
    "email": "igortbr@hotmail.com"
}

```

#### Reset Password
```
Route: /reset/:token
Method: PATCH
Body: {
    "password": "123"
}

```
#### Verify User
```
Route: /verifyEmail
Method: PATCH
Body: {
    "token": "41f3f885e2..."
}

```

#### Verify user not me
```
Route: /verifyEmail
Method: DELETE
Body: {
    "token": "41f3f885e2..."
}

```

#### Loggout
```
Route: /loggout
Method: DELETE
Body: {
    Authorization?: "token"
}
Headers: {Authorization: "token"}

```


### Rotas de Formularios

#### Get Form
```
Route: /form/list?type=FORM1
Method: GET
Body: {
    Authorization?: "token"
}
Headers: {Authorization: "token"}

```

#### Get Form
```
Route: /form/list
Method: GET
Body: {
    type: FORM1
    Authorization?: "token"
}
Headers: {Authorization: "token"}
```


#### Get Form
```
Route: /form/:idform
Method: PUT
Body: {
    "questions": [
        
        {
            "questionID": 1,
            "choice": 2,
            "text": "Igor"
        }
    ],
    "options": {
        "existing": true,
        "customDate": "2025-12-03T18:55:31.249Z"
    }
    Authorization?: "token"
}
Headers: {Authorization: "token"}
```

#### Get open form
```
Route: /form/:idform/open
Method: GET
Body: {
    Authorization?: "token"
}
Headers: {Authorization: "token"}
```

#### Close form
```
Route: /form/:idform/close
Method: GET
Body: {
    Authorization?: "token"
}
Headers: {Authorization: "token"}
```

## DIAGRAM: https://dbdiagram.io/d/6915bf446735e11170a3d917


