# Guia para subir futuros proyectos a GitHub

Esta guia sirve como plantilla rapida para cualquier proyecto nuevo.

## 1. Revisar en que carpeta estas

```bash
pwd
ls
```

Confirma que estas parado en la raiz del proyecto.

## 2. Inicializar Git

Si el proyecto todavia no tiene repositorio:

```bash
git init
```

## 3. Crear `.gitignore`

Para proyectos Node.js, un ejemplo basico es:

```gitignore
node_modules
dist
.env
```

## 4. Ver tu identidad local de Git

Esto indica con que nombre y correo quedaran firmados los commits:

```bash
git config --get user.name
git config --get user.email
```

Si quieres cambiarlos:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu_correo@ejemplo.com"
```

## 5. Hacer el primer commit

```bash
git add .
git commit -m "Initial commit"
```

## 6. Saber a que usuario de GitHub ira el proyecto

Importante: `user.name` y `user.email` no determinan la cuenta destino en GitHub.

La cuenta destino depende de una de estas dos cosas:

- La cuenta autenticada en GitHub.
- El remoto `origin` configurado en el proyecto.

### Ver la cuenta autenticada con GitHub CLI

```bash
gh auth status
```

### Ver a que remoto apunta el proyecto

```bash
git remote -v
```

Ejemplo:

```bash
origin  git@github.com:jacquedevelop/mi-proyecto.git
```

En ese caso, el repositorio iria al usuario `jacquedevelop`.

## 7. Crear el repositorio en GitHub

Tienes dos caminos.

### Opcion A: Desde la web

1. Entra a GitHub.
2. Haz clic en `New repository`.
3. Escribe el nombre del repo.
4. Elige si sera publico o privado.
5. Crea el repositorio vacio.

Luego conecta el proyecto local:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
```

O con SSH:

```bash
git remote add origin git@github.com:TU_USUARIO/TU_REPO.git
```

### Opcion B: Desde terminal con GitHub CLI

```bash
gh repo create TU_REPO --public --source=. --remote=origin --push
```

Si lo quieres privado:

```bash
gh repo create TU_REPO --private --source=. --remote=origin --push
```

## 8. Subir la rama principal

Si creaste el repo desde la web:

```bash
git branch -M main
git push -u origin main
```

## 9. Verificar que se subio bien

```bash
git remote -v
git branch
```

Tambien puedes abrir el repositorio en GitHub y confirmar:

- Nombre del repo
- Usuario u organizacion dueña
- Archivos subidos
- Rama `main`

## 10. Flujo normal para cambios futuros

```bash
git status
git add .
git commit -m "Describe tu cambio"
git push
```

## 11. Comandos utiles de diagnostico

Ver si la carpeta ya tiene Git:

```bash
git rev-parse --is-inside-work-tree
```

Ver el remoto actual:

```bash
git remote -v
```

Cambiar el remoto a otro usuario o repo:

```bash
git remote set-url origin https://github.com/TU_USUARIO/TU_REPO.git
```

## 12. Errores comunes

### `fatal: not a git repository`

No has corrido `git init` o no estas en la carpeta correcta.

### `remote origin already exists`

Ya existe un remoto configurado. Revisa:

```bash
git remote -v
```

Si necesitas cambiarlo:

```bash
git remote set-url origin https://github.com/TU_USUARIO/TU_REPO.git
```

### `permission denied` o error de autenticacion

Tu sesion de GitHub o tu llave SSH no corresponden a la cuenta esperada.

Revisa:

```bash
gh auth status
```

## 13. Checklist rapido

- Estoy en la raiz del proyecto
- El proyecto ya tiene `.gitignore`
- Ya hice `git init`
- Ya hice al menos un commit
- Verifique mi cuenta con `gh auth status`
- Verifique `git remote -v`
- Hice `git push -u origin main`

