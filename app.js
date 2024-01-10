const PacienteController = require("./controllers/PacienteController");
const ConsultaController = require("./controllers/ConsultaController");
const MenuView = require("./views/MenuView");
const PacienteDAO = require("./dao/PacienteDAO");
const ConsultaDAO = require("./dao/ConsultaDAO");

const pacientes = PacienteDAO.carregarPacientes();
const consultas = ConsultaDAO.carregarConsultas();

const pacienteController = new PacienteController();
const consultaController = new ConsultaController(pacienteController);

const menu = new MenuView(pacienteController, consultaController);
menu.mostrarMenuPrincipal();
