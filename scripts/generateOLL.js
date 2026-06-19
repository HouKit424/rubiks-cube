import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { ollAlgorithms } from '../src/data/oll.js';

const U = 0, R = 1, F = 2, D = 3, L = 4, B = 5;

// Faces are 3x3 arrays. Initialized with their face index.
function getSolved() {
  const state = [];
  for(let i=0; i<6; i++) {
    state.push(Array(9).fill(i));
  }
  return state;
}

// Helper to get column, row
function rotateFace(face) {
  const newFace = Array(9);
  newFace[0] = face[6]; newFace[1] = face[3]; newFace[2] = face[0];
  newFace[3] = face[7]; newFace[4] = face[4]; newFace[5] = face[1];
  newFace[6] = face[8]; newFace[7] = face[5]; newFace[8] = face[2];
  return newFace;
}

function rotateFaceCCW(face) {
  const newFace = Array(9);
  newFace[0] = face[2]; newFace[1] = face[5]; newFace[2] = face[8];
  newFace[3] = face[1]; newFace[4] = face[4]; newFace[5] = face[7];
  newFace[6] = face[0]; newFace[7] = face[3]; newFace[8] = face[6];
  return newFace;
}

// Move U
function moveU(state) {
  state[U] = rotateFace(state[U]);
  const temp = [state[F][0], state[F][1], state[F][2]];
  state[F][0] = state[R][0]; state[F][1] = state[R][1]; state[F][2] = state[R][2];
  state[R][0] = state[B][0]; state[R][1] = state[B][1]; state[R][2] = state[B][2];
  state[B][0] = state[L][0]; state[B][1] = state[L][1]; state[B][2] = state[L][2];
  state[L][0] = temp[0]; state[L][1] = temp[1]; state[L][2] = temp[2];
}
function moveUPrime(state) { moveU(state); moveU(state); moveU(state); }
function moveU2(state) { moveU(state); moveU(state); }

// Move R
function moveR(state) {
  state[R] = rotateFace(state[R]);
  const temp = [state[U][2], state[U][5], state[U][8]];
  state[U][2] = state[F][2]; state[U][5] = state[F][5]; state[U][8] = state[F][8];
  state[F][2] = state[D][2]; state[F][5] = state[D][5]; state[F][8] = state[D][8];
  state[D][2] = state[B][6]; state[D][5] = state[B][3]; state[D][8] = state[B][0];
  state[B][6] = temp[0]; state[B][3] = temp[1]; state[B][0] = temp[2];
}
function moveRPrime(state) { moveR(state); moveR(state); moveR(state); }
function moveR2(state) { moveR(state); moveR(state); }

// Move F
function moveF(state) {
  state[F] = rotateFace(state[F]);
  const temp = [state[U][6], state[U][7], state[U][8]];
  state[U][6] = state[L][8]; state[U][7] = state[L][5]; state[U][8] = state[L][2];
  state[L][8] = state[D][2]; state[L][5] = state[D][1]; state[L][2] = state[D][0];
  state[D][2] = state[R][0]; state[D][1] = state[R][3]; state[D][0] = state[R][6];
  state[R][0] = temp[0]; state[R][3] = temp[1]; state[R][6] = temp[2];
}
function moveFPrime(state) { moveF(state); moveF(state); moveF(state); }
function moveF2(state) { moveF(state); moveF(state); }

// Move L
function moveL(state) {
  state[L] = rotateFace(state[L]);
  const temp = [state[U][0], state[U][3], state[U][6]];
  state[U][0] = state[B][8]; state[U][3] = state[B][5]; state[U][6] = state[B][2];
  state[B][8] = state[D][0]; state[B][5] = state[D][3]; state[B][2] = state[D][6];
  state[D][0] = state[F][0]; state[D][3] = state[F][3]; state[D][6] = state[F][6];
  state[F][0] = temp[0]; state[F][3] = temp[1]; state[F][6] = temp[2];
}
function moveLPrime(state) { moveL(state); moveL(state); moveL(state); }
function moveL2(state) { moveL(state); moveL(state); }

// Move B
function moveB(state) {
  state[B] = rotateFace(state[B]);
  const temp = [state[U][2], state[U][1], state[U][0]];
  state[U][2] = state[R][8]; state[U][1] = state[R][5]; state[U][0] = state[R][2];
  state[R][8] = state[D][6]; state[R][5] = state[D][7]; state[R][2] = state[D][8];
  state[D][6] = state[L][0]; state[D][7] = state[L][3]; state[D][8] = state[L][6];
  state[L][0] = temp[0]; state[L][3] = temp[1]; state[L][6] = temp[2];
}
function moveBPrime(state) { moveB(state); moveB(state); moveB(state); }
function moveB2(state) { moveB(state); moveB(state); }

// Move D
function moveD(state) {
  state[D] = rotateFace(state[D]);
  const temp = [state[F][6], state[F][7], state[F][8]];
  state[F][6] = state[L][6]; state[F][7] = state[L][7]; state[F][8] = state[L][8];
  state[L][6] = state[B][6]; state[L][7] = state[B][7]; state[L][8] = state[B][8];
  state[B][6] = state[R][6]; state[B][7] = state[R][7]; state[B][8] = state[R][8];
  state[R][6] = temp[0]; state[R][7] = temp[1]; state[R][8] = temp[2];
}
function moveDPrime(state) { moveD(state); moveD(state); moveD(state); }
function moveD2(state) { moveD(state); moveD(state); }

// Slice moves
function moveM(state) {
  const temp = [state[U][1], state[U][4], state[U][7]];
  state[U][1] = state[B][7]; state[U][4] = state[B][4]; state[U][7] = state[B][1];
  state[B][7] = state[D][1]; state[B][4] = state[D][4]; state[B][1] = state[D][7];
  state[D][1] = state[F][1]; state[D][4] = state[F][4]; state[D][7] = state[F][7];
  state[F][1] = temp[0]; state[F][4] = temp[1]; state[F][7] = temp[2];
}
function moveMPrime(state) { moveM(state); moveM(state); moveM(state); }
function moveM2(state) { moveM(state); moveM(state); }

function moveS(state) {
  const temp = [state[U][3], state[U][4], state[U][5]];
  state[U][3] = state[L][7]; state[U][4] = state[L][4]; state[U][5] = state[L][1];
  state[L][7] = state[D][5]; state[L][4] = state[D][4]; state[L][1] = state[D][3];
  state[D][5] = state[R][1]; state[D][4] = state[R][4]; state[D][3] = state[R][7];
  state[R][1] = temp[0]; state[R][4] = temp[1]; state[R][7] = temp[2];
}
function moveSPrime(state) { moveS(state); moveS(state); moveS(state); }
function moveS2(state) { moveS(state); moveS(state); }

function moveE(state) {
  const temp = [state[F][3], state[F][4], state[F][5]];
  state[F][3] = state[L][3]; state[F][4] = state[L][4]; state[F][5] = state[L][5];
  state[L][3] = state[B][3]; state[L][4] = state[B][4]; state[L][5] = state[B][5];
  state[B][3] = state[R][3]; state[B][4] = state[R][4]; state[B][5] = state[R][5];
  state[R][3] = temp[0]; state[R][4] = temp[1]; state[R][5] = temp[2];
}
function moveEPrime(state) { moveE(state); moveE(state); moveE(state); }
function moveE2(state) { moveE(state); moveE(state); }

// Wide moves
function moveRw(state) { moveR(state); moveMPrime(state); }
function moveRwPrime(state) { moveRPrime(state); moveM(state); }
function moveRw2(state) { moveRw(state); moveRw(state); }
function mover(state) { moveRw(state); }
function moverPrime(state) { moveRwPrime(state); }
function mover2(state) { moveRw2(state); }

function moveLw(state) { moveL(state); moveM(state); }
function moveLwPrime(state) { moveLPrime(state); moveMPrime(state); }
function moveLw2(state) { moveLw(state); moveLw(state); }
function movel(state) { moveLw(state); }
function movelPrime(state) { moveLwPrime(state); }
function movel2(state) { moveLw2(state); }

function moveFw(state) { moveF(state); moveS(state); }
function moveFwPrime(state) { moveFPrime(state); moveSPrime(state); }
function moveFw2(state) { moveFw(state); moveFw(state); }
function movef(state) { moveFw(state); }
function movefPrime(state) { moveFwPrime(state); }
function movef2(state) { moveFw2(state); }

// Rotations
function movex(state) { moveR(state); moveMPrime(state); moveLPrime(state); }
function movexPrime(state) { moveRPrime(state); moveM(state); moveL(state); }
function movex2(state) { movex(state); movex(state); }

function movey(state) { moveU(state); moveEPrime(state); moveDPrime(state); }
function moveyPrime(state) { moveUPrime(state); moveE(state); moveD(state); }
function movey2(state) { movey(state); movey(state); }

const ops = {
  "U": moveU, "U'": moveUPrime, "U2": moveU2,
  "R": moveR, "R'": moveRPrime, "R2": moveR2,
  "F": moveF, "F'": moveFPrime, "F2": moveF2,
  "L": moveL, "L'": moveLPrime, "L2": moveL2,
  "B": moveB, "B'": moveBPrime, "B2": moveB2,
  "D": moveD, "D'": moveDPrime, "D2": moveD2,
  "M": moveM, "M'": moveMPrime, "M2": moveM2,
  "S": moveS, "S'": moveSPrime, "S2": moveS2,
  "E": moveE, "E'": moveEPrime, "E2": moveE2,
  "r": mover, "r'": moverPrime, "r2": mover2,
  "l": movel, "l'": movelPrime, "l2": movel2,
  "f": movef, "f'": movefPrime, "f2": movef2,
  "x": movex, "x'": movexPrime, "x2": movex2,
  "y": movey, "y'": moveyPrime, "y2": movey2,
};

function invertAlg(moves) {
  return [...moves].reverse().map(m => {
    if (m.endsWith("2")) return m;
    if (m.endsWith("'")) return m[0];
    return m + "'";
  });
}

function runAlg(state, moves) {
  for(const m of moves) {
    if(!ops[m]) throw new Error("Unknown move " + m);
    ops[m](state);
  }
}

const ollData = [];

for (const oll of ollAlgorithms) {
  const state = getSolved();
  const algStr = oll.variants[0].chunks.map(c => c.moves).flat();
  // To get the pattern that the alg SOLVES, we apply the inverse of the alg to a solved cube.
  const inverse = invertAlg(algStr);
  runAlg(state, inverse);

  const top = state[U].map(c => c === U ? 1 : 0);
  
  // Back face is at index 5. The top row of back face is [B0, B1, B2], but we need to see it from the top-down view.
  // Actually, B0 is top right of back face, B1 is top middle, B2 is top left.
  // Let's just grab the actual values and map if U=0.
  const t = [state[B][2], state[B][1], state[B][0]].map(c => c === U ? 1 : 0);
  const b = [state[F][0], state[F][1], state[F][2]].map(c => c === U ? 1 : 0);
  const l = [state[L][0], state[L][1], state[L][2]].map(c => c === U ? 1 : 0);
  const r = [state[R][2], state[R][1], state[R][0]].map(c => c === U ? 1 : 0);

  ollData.push({
    id: oll.id,
    top,
    sides: { t, b, l, r }
  });
}

fs.writeFileSync('ollData.json', JSON.stringify(ollData, null, 2));
console.log("Done");
