// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (number, arr) => {
  return {
    specimenNum: number,
    dna: arr,
    mutate () {
        /*this.dna = this.dna.map(base => {
          let newBase = '';
          do {
            newBase = returnRandBase();
          } while(base === newBase) 
            return newBase;
        });*/
        // randomly selecting a SINGLE base changing the current base to a different base!
        let randomBase = Math.floor(Math.random() * this.dna.length);
        console.log('check index: ' + randomBase);
        let originBase = this.dna[randomBase];
        do {
          this.dna[randomBase] = returnRandBase();
        } while(originBase === this.dna[randomBase]);

      }, 
    compareDNA (aequorObj, showDetails=false) {
      let length = this.dna.length,
      match = 0;
        for(let i = 0; i < this.dna.length; i++) {
          if(aequorObj.dna[i] === this.dna[i]) {
            match++;
            if(showDetails) {
              console.log('match on index: ' + i + ' = ' + this.dna[i]);
            }
          }
        }
        if(showDetails) {
          console.log(`specimen #1 and specimen #2 have ${Math.floor((match / length) * 100)}% DNA in common.`);
        }
      return Math.floor((match / length) * 100);
    },
    willLikelySurviveSingle () {
      let match = 0,
      length = this.dna.length,
      result = undefined;
      console.log(this.dna.join(' '));
      for(let i = 0; i < length; i++) {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') { 
          match++;
          console.log(`match found on index ${i} = ${this.dna[i]}`);
        }        
      }
      result = ((match / length * 100) >= 60) ? true : false;
      console.log(`sum of matches: ${match}, therefore: ${result}`);
    },
    willLikelySurviveMulti () {
      let match = 0,
      length = this.dna.length,
      result = undefined,
      results = [];
      for(let i = 0; i < length; i++) {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') { 
          match++;
        }        
      }
      results.push(result = ((match / length * 100) >= 60) ? true : false);
      results.push(match);      
      return results;
    }    
  }
}

const createAliveAequors = (amount, showDetail=false) => {
  let arr = [];
  for(let i = 0; i < amount;) {
    let newAequor = pAequorFactory(i, mockUpStrand());
    if(newAequor.willLikelySurviveMulti()[0]) { 
/*
* willLikelySurviveMulti()[0] weil Array
* zurückgegeben wird und boolean d. array brauchen
*/          
      arr.push(newAequor);
      i++;
    }
  }
  if(showDetail) {
    console.log('----requested AeQuors: ' + amount);
      arr.forEach(obj => {
        console.log('Nr ' + (obj.specimenNum + 1) + ': ' + obj.dna.join(' '));
        console.log('survivability: ' + obj.willLikelySurviveMulti()[0] + '\n' + 'C/G matches: ' + obj.willLikelySurviveMulti()[1]);
      });
  }
    
  return arr;
}

//find the two most related instances of pAequor:
const mostRelated = (arr) => {
  let result = 0,
  temp = 0,
  mostRelated = [];
  arr.forEach(aeQuor => {
    for(let x = 0; x < arr.length; x++) {
      if(aeQuor.specimenNum != arr[x].specimenNum) {
        result = aeQuor.compareDNA(arr[x]);
      }
      if(result > temp) {
        mostRelated.splice(0, 3, aeQuor.specimenNum, arr[x].specimenNum, result);
        temp = result;         
      }
      /*
       * console.log for output of all el's with result:
       */      
      //console.log('No ' + aeQuor.specimenNum +' + No ' + arr[x].specimenNum + ': ' + result);
    }
  });
  console.log('Amount of requested AeQuors: '+ arr.length +'\nMost related is No ' + mostRelated[0] + ' and No ' + mostRelated[1] + ' with a match of ' + mostRelated[2] + '%');
}

console.log('\n');
let aequor = pAequorFactory(31, mockUpStrand());
let aequor2 = pAequorFactory(32, mockUpStrand());
console.log('----Create:')
console.log(aequor.dna);

console.log('\n');

console.log('----Mutate:')

aequor.mutate();
console.log(aequor.dna);

console.log('\n');

console.log('----Compare:')
console.log('passed aequor2: \n' + aequor2.dna.join(' '));
console.log('current: \n' + aequor.dna.join(' '));
aequor.compareDNA(aequor2, true);

console.log('\n');

console.log('----Will it survive?: ');
aequor2.willLikelySurviveSingle();

console.log('\n');

const studyStuff = createAliveAequors(5, true);
//console.log(studyStuff);

console.log('\n');
console.log('----Most related: ');
mostRelated(createAliveAequors(50, false));

console.log('\n');



