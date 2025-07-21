const cursos = [
  { id: "biogral", nombre: "Biología general", requiere: [] },
  { id: "introbiom", nombre: "Introducción a la biología marina", requiere: [] },
  { id: "comesp", nombre: "Comunicación en español", requiere: [] },
  { id: "coming", nombre: "Comunicación en inglés", requiere: [] },
  { id: "introalg", nombre: "Introducción al álgebra", requiere: [] },

  { id: "fundmar", nombre: "Fundamentos en ciencias del mar", requiere: [] },
  { id: "zoolinv", nombre: "Zoología de invertebrados", requiere: [] },
  { id: "bioveg", nombre: "Biología vegetal", requiere: [] },
  { id: "quimgra", nombre: "Química general", requiere: [] },
  { id: "algtri", nombre: "Álgebra y trigonometría", requiere: ["introalg"] },

  { id: "algas", nombre: "Biología de algas", requiere: [] },
  { id: "zoolvert", nombre: "Zoología de vertebrados", requiere: [] },
  { id: "oceanog", nombre: "Oceanografía", requiere: [] },
  { id: "quimorg", nombre: "Química orgánica", requiere: ["quimgra"] },
  { id: "calc", nombre: "Introducción al cálculo", requiere: ["algtri"] },

  { id: "eco", nombre: "Ecología general", requiere: [] },
  { id: "antro", nombre: "Antropoceno y ciencias del mar", requiere: ["fundmar"] },
  { id: "bioq", nombre: "Bioquímica", requiere: ["quimorg"] },
  { id: "filo", nombre: "Fundamentos filosóficos", requiere: [] },
  { id: "fisica", nombre: "Física", requiere: ["introalg"] },

  { id: "ecomar", nombre: "Ecología marina", requiere: ["eco"] },
  { id: "lecturaing", nombre: "Lectura en inglés", requiere: ["coming"] },
  { id: "ocebio", nombre: "Oceanografía biológica", requiere: ["oceanog"] },
  { id: "biomol", nombre: "Biología molecular", requiere: [] },
  { id: "bioest", nombre: "Bioestadística", requiere: [] },
  { id: "integ1", nombre: "Integración del saber I", requiere: [] },

  { id: "acuic", nombre: "Acuicultura", requiere: [] },
  { id: "teo", nombre: "Fundamentos teológicos", requiere: [] },
  { id: "ecoan", nombre: "Ecofisiología animal", requiere: [] },
  { id: "gen", nombre: "Genética y evolución", requiere: ["biomol"] },
  { id: "diseno", nombre: "Diseño de muestreos", requiere: ["bioest"] },

  { id: "manejo", nombre: "Manejo y conservación", requiere: ["antro"] },
  { id: "semibib", nombre: "Seminario bibliográfico", requiere: [] },
  { id: "biopeq", nombre: "Biología pesquera", requiere: [] },
  { id: "opt1", nombre: "Optativo de profundización I", requiere: [] },
  { id: "integ2", nombre: "Integración del saber II", requiere: ["integ1"] },

  { id: "impacto", nombre: "Evaluación impacto ambiental", requiere: ["eco"] },
  { id: "semiinv", nombre: "Seminario de investigación", requiere: ["semibib"] },
  { id: "opt2", nombre: "Optativo II", requiere: [] },
  { id: "opt3", nombre: "Optativo III", requiere: [] },
  { id: "opt4", nombre: "Optativo IV", requiere: [] },

  { id: "empren", nombre: "Emprendimiento en Biología Marina", requiere: ["semiinv"] },
  { id: "practica", nombre: "Actividad práctica", requiere: [] },
  { id: "etica", nombre: "Ética profesional", requiere: [] },
  { id: "opt5", nombre: "Optativo V", requiere: [] },
  { id: "opt6", nombre: "Optativo VI", requiere: [] },
  { id: "opt7", nombre: "Optativo VII", requiere: [] },

  { id: "habilitacion", nombre: "Habilitación profesional", requiere: [] }
];

const contenedor = document.getElementById('malla');
const template = document.getElementById('curso-template');

const estados = {};

function renderMalla() {
  const semestres = {
    "I Semestre (1° Año)": ["introbiom", "biogral", "comesp", "coming", "introalg"],
    "II Semestre (1° Año)": ["fundmar", "zoolinv", "bioveg", "quimgra", "algtri"],
    "III Semestre (2° Año)": ["algas", "zoolvert", "oceanog", "quimorg", "calc"],
    "IV Semestre (2° Año)": ["eco", "antro", "bioq", "filo", "fisica"],
    "V Semestre (3° Año)": ["ecomar", "lecturaing", "ocebio", "biomol", "bioest", "integ1"],
    "VI Semestre (3° Año)": ["acuic", "teo", "ecoan", "gen", "diseno"],
    "VII Semestre (4° Año)": ["manejo", "semibib", "biopeq", "opt1", "integ2"],
    "VIII Semestre (4° Año)": ["impacto", "semiinv", "opt2", "opt3", "opt4"],
    "IX Semestre (5° Año)": ["empren", "practica", "etica", "opt5", "opt6", "opt7"],
    "X Semestre (5° Año)": ["habilitacion"]
  };

  for (const [nombreSemestre, ids] of Object.entries(semestres)) {
    const bloque = document.createElement('div');
    bloque.classList.add('semestre');

    const titulo = document.createElement('h2');
    titulo.textContent = nombreSemestre;
    bloque.appendChild(titulo);

    const contenedorCursos = document.createElement('div');
    contenedorCursos.classList.add('cursos');

    ids.forEach(id => {
      const curso = cursos.find(c => c.id === id);
      const clone = template.content.cloneNode(true);
      const box = clone.querySelector('.curso');
      const btn = clone.querySelector('button');
      const label = clone.querySelector('.nombre');

      box.dataset.id = curso.id;
      box.dataset.requiere = curso.requiere.join(',');
      label.textContent = curso.nombre;

      if (curso.requiere.length === 0) {
        box.classList.remove('bloqueado');
        btn.disabled = false;
      }

      btn.addEventListener('click', () => {
        estados[curso.id] = true;
        box.classList.add('aprobado');
        btn.disabled = true;
        desbloquearCursos();
      });

      contenedorCursos.appendChild(clone);
    });

    bloque.appendChild(contenedorCursos);
    contenedor.appendChild(bloque);
  }
}
renderMalla();
