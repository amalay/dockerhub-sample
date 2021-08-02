# Simple Docker App With NodeJS

## Learning Steps


### Code setup from github
1. Clone the repository from https://github.com/amalay/docker-samples/tree/main/node-simple
2. Start Visual Studio Code and open go to the "node-simple" folder
3. Run npm install on your terminal to install the required packages.
4. Open Docker Dektop at your local machine. If it not install then install it first.

### How to run the docker app?
You can run the app in two way either by executing couple of docker commands individually or run the docker-compose command pointing to docker-compose.yml file(Which contains all the required commands in it) on your terminal as below:

#### Method I: 
By executing docker commands individually on your terminal as below:

1. To build docker image: 
   > "docker build -t avimg-node-simple ."

   After successfult execution of this command, you can see the docker image of this project in your docker desktop app under images section as below:
   
![image](https://user-images.githubusercontent.com/84455469/127449789-efd5e683-1ec1-439a-9a9c-f34b01dfefde.png)

2. To run docker image in a container: 
   > "docker run --rm -p 5000:5000 --name avcon-node-simple avimg-node-simple"

   After successfult execution of this command, docker conatiner will start running at port 5000 and you can see it in your docker desktop app under container/apps section as below:
   
![image](https://user-images.githubusercontent.com/84455469/127449888-94ff777d-d05e-4f1d-b28b-2a4ecc35f204.png)

#### Method II: 
By executing docker-compose commands on your terminal as below:
> "docker-compose up"

Both method will do the same thing.

### Validate the test api
Open any browser or postman and enter the URL http://localhost:5000/api/test and hit the enter button. You will see the response as below:

![image](https://user-images.githubusercontent.com/84455469/127156329-0ab75553-7897-4b3d-9a1d-b48e8389fa99.png)
