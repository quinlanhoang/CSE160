class Camera{
   constructor(){
       this.eye = new Vector3([10,0,3]);
       this.at  = new Vector3([10,0,100]);
       this.up  = new Vector3([0,1,0]);
   }

   forward(){
       var atCopy  = new Vector3(this.at.elements);
       var eyeCopy = new Vector3(this.eye.elements);
       var f = atCopy.sub(eyeCopy);
       f = f.normalize();
       this.eye = this.eye.add(f);
       this.at  = this.at.add(f);
   }

   backward(){
       var atCopy  = new Vector3(this.at.elements);
       var eyeCopy = new Vector3(this.eye.elements);        
       var f = atCopy.sub(eyeCopy);
       f = f.normalize();
       this.at  = this.at.sub(f);
       this.eye = this.eye.sub(f);
   }

   left(){
       var atCopy  = new Vector3(this.at.elements);
       var eyeCopy = new Vector3(this.eye.elements);
       var f = atCopy.sub(eyeCopy);

       f = f.normalize();
       f = f.mul(-1);
       var s = Vector3.cross(f, this.up);
       s = s.normalize();

       this.at  = this.at.add(s);
       this.eye = this.eye.add(s);
   }

   right(){
       var atCopy  = new Vector3(this.at.elements);
       var eyeCopy = new Vector3(this.eye.elements);
       var upCopy  = new Vector3(this.up.elements);
       var f = atCopy.sub(eyeCopy);

       f = f.normalize();
       var s = Vector3.cross(f, upCopy);
       s = s.normalize();
       this.at  = this.at.add(s);
       this.eye = this.eye.add(s);
   }

   rotRight(){
       var atCopy  = new Vector3(this.at.elements);
       var eyeCopy = new Vector3(this.eye.elements);
       var f = atCopy.sub(eyeCopy);

       var rotationMatrix = new Matrix4();
       rotationMatrix.setRotate(-5, this.up.elements[0], this.up.elements[1], this.up.elements[2]);

       var f_prime = rotationMatrix.multiplyVector3(f);

       this.at = f_prime.add(this.eye);;
   }

   rotLeft(){
       var atCopy  = new Vector3(this.at.elements);
       var eyeCopy = new Vector3(this.eye.elements);
       var f = atCopy.sub(eyeCopy);

       var rotationMatrix = new Matrix4();
       rotationMatrix.setRotate(5, this.up.elements[0], this.up.elements[1], this.up.elements[2]);

       var f_prime = rotationMatrix.multiplyVector3(f);

       this.at = f_prime.add(this.eye);
   }

   upward(){
       this.eye.elements[1] += 1;
       this.at.elements[1]  += 1;
   }

   downward(){
       this.eye.elements[1] -= 1;
       this.at.elements[1]  -= 1;
   }

   rotateLeftRight(angleDegrees) {
      const f = this.at.sub(this.eye);
      const rotationMatrix = new Matrix4().setRotate(angleDegrees, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
      const f_prime = rotationMatrix.multiplyVector3(f);
      this.at = this.eye.add(f_prime);
    }
    
    rotateUpDown(angleDegrees) {
      const f = this.at.sub(this.eye);
      const s = Vector3.cross(f, this.up).normalize();  // side vector
      const rotationMatrix = new Matrix4().setRotate(angleDegrees, s.elements[0], s.elements[1], s.elements[2]);
      const f_prime = rotationMatrix.multiplyVector3(f);
      this.at = this.eye.add(f_prime);
    }
    
    panLeft(degrees) {
      let rad = degrees * Math.PI / 180.0;
      let rotationMatrix = new Matrix4().setRotate(rad, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
      let direction = new Vector3();
      direction.set(this.at).sub(this.eye);
      direction = rotationMatrix.multiplyVector3(direction);
      this.at.set(this.eye).add(direction);
    }
    
    panUp(degrees) {
      let rad = degrees * Math.PI / 180.0;
      let look = new Vector3();
      look.set(this.at).sub(this.eye);
      let right = Vector3.cross(this.up, look);
      right.normalize();
      let rotationMatrix = new Matrix4().setRotate(rad, right.elements[0], right.elements[1], right.elements[2]);
      look = rotationMatrix.multiplyVector3(look);
      this.at.set(this.eye).add(look);
    }
    
}