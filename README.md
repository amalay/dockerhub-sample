# Publishing Simple NodeJS App on Docker hub or Docker Container Registry (now known as Github Container Registry)

## Learning Steps


### Code setup from github
1. Clone the repository from https://github.com/amalay/dockerhub-sample
2. Start Visual Studio Code and open go to the "node-simple" folder
3. Run npm install on your terminal to install the required packages.
4. Open Docker Dektop at your local machine. If it not install then install it first.

Required packages and commands to install
> npm install express --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

> npm install dotenv --save

### Create docker image of your app
You can execute below command on any terminal to build docker image.
``` 
> "docker build -t <IMAGE NAME> ."
Ex: "docker build -t avimg-dockerhub-sample". It will take a default tag as latest automatically.
```

OR
```
> "docker build -t <DOCKER HUB ACCOUNT ID>/<REPO NAME>:<TAG NAME> ."
Ex: "docker build -t amalayverma/avimg-dockerhub-sample[:latest] ."
```

Once docker image is created successfully, you can see it in your Docker Desktop.

### Publish your docker image to your Docker hub
Before publishing your docker image to your Docker hub, you have to login to docker hub by executing below command:

```
> docker login
```

After successfull login to Docker hub, you can execute the below command to push your image to your Docker hub:
```
> "docker push <DOCKER HUB ACCOUNT ID>/<YOUR IMAGE NAME>:<TAG NAME>"
Ex: "docker push amalayverma/avimg-dockerhub-sample:latest"
```

After successfull execution of this command, you can see your image into your Docker hub under Repositories section. You can also see it in your Docker Desktop under Remote Repositories section as below:


### Defining Github workflow to publish docker image on Docker hub as well as Github Container Registry on any code checked-in event
#### Workflow to publish in Docker hub

1. Create one folder with name .github inside root folder of your project.
2. Create one more folder with name workflows inside .github folder.
3. Create one .yaml file inside workflows folder with name let say dockerhub.yaml.
4. Add below scripts in this file:
```
name: Continuous Integration to Docker Hub

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - name: Check Out Repo
        uses: actions/checkout@v2

      - name: Login to Docker Hub
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}
          
      - name: Set up Docker Buildx
        id: buildx
        uses: docker/setup-buildx-action@v1

      - name: Cache Docker layers
        uses: actions/cache@v2
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-
      - name: Build and push
        id: docker_build
        uses: docker/build-push-action@v2
        with:          
          context: ./
          file: ./Dockerfile          
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ secrets.DOCKER_HUB_USERNAME }}/av-dockerhub-sample:latest
          builder: ${{ steps.buildx.outputs.name }}
          cache-from: type=local,src=/tmp/.buildx-cache
          cache-to: type=local,dest=/tmp/.buildx-cache

      - name: Image digest
        run: echo ${{ steps.docker_build.outputs.digest }}
```
6. Define these two keys in your repository by navigating as (Your repository ----> settings ----> secrets ----> New repository secret then add your keys and values.
```
DOCKER_HUB_USERNAME and DOCKER_HUB_ACCESS_TOKEN to hold the docker hub user name and docker hub personal access token (PAT) respectively so that these keys can be utilised to connect with your docker hub to publish the image.
```
8. Checked-in all the changes to your github repository.
9. Again go back to your VS Code and do any changes in your file and checked-in. Your workflow will auto triggered and publish the image into docker hub.

#### Workflow to publish in Docker Container Registry/Github Container Registry
1. Create another .yaml file inside workflows folder with name let say githubContainerRegistry.yaml.
2. Add the below scripts in this file
```
name: Continuous Integration to Github Container Registry

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - name: Check Out Repo
        uses: actions/checkout@v2

      - name: Login to Docker Hub
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v1
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.PAT }}
          
      - name: Set up Docker Buildx
        id: buildx
        uses: docker/setup-buildx-action@v1

      - name: Cache Docker layers
        uses: actions/cache@v2
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-
      - name: Build and push
        id: docker_build
        uses: docker/build-push-action@v2
        with:          
          context: ./
          file: ./Dockerfile          
          push: ${{ github.event_name != 'pull_request' }}          
          tags: ghcr.io/${{ github.repository_owner }}/av-dockerhub-sample:latest
          builder: ${{ steps.buildx.outputs.name }}
          cache-from: type=local,src=/tmp/.buildx-cache
          cache-to: type=local,dest=/tmp/.buildx-cache

      - name: Image digest
        run: echo ${{ steps.docker_build.outputs.digest }}
```
4. Checked-in to your github repository.
