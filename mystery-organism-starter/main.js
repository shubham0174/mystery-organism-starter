// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num,arr) => {
  return {
    specimenNum : num,
    dna : arr,
    mutate () {
      const i = Math.floor(Math.random() * this.dna.length);
      let x;
      do {
        x = returnRandBase();
      } while (x === this.dna[i])
      
      this.dna[i] = x;
      return this.dna;
    },
    compareDNA (pAequor) {
      let count = 0;
      for (let i = 0; i< pAequor.dna.length; i++) {
        if (pAequor.dna[i] === this.dna[i]) count++;
      }
      const percentage = Math.round(count/pAequor.dna.length*100);
      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common`);
    },
    willLikelySurvive () {
      return this.dna.reduce((accumulator,x) => {
        if (x === 'C' || x === 'G') {
          accumulator++;
        } return accumulator;
      },0) >=0.6 * this.dna.length;
    }
  }
}

const survivingSpecimen = [];

for (let i = 1; i<= 30; i++) {
  const newSpecies = pAequorFactory(i,mockUpStrand());
  if (newSpecies.willLikelySurvive()) survivingSpecimen.push(newSpecies);
}