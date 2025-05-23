import { AppointmentService } from "../../infrastructure/services/AppointmentService";
import { ExpressHandler } from "../../utils/types/apis";
import {
  CreateAppointmentRequest,
  CreateAppointmentResponse,
  DeleteAppointmentParams,
  DeleteAppointmentRequest,
  DeleteAppointmentResponse,
  GetAllAppointmentsRequest,
  GetAllAppointmentsResponse,
  GetAppointmentByIdParams,
  GetAppointmentByIdRequest,
  GetAppointmentByIdResponse,
  UpdateAppointmentParams,
  UpdateAppointmentRequest,
  UpdateAppointmentResponse,
} from "../../core/dto/appointment.dto";
import { Appointment } from "../../core/entities/Appointment";

export class AppointmentController {
  constructor(private service: AppointmentService) {}

  getAll: ExpressHandler<GetAllAppointmentsRequest, GetAllAppointmentsResponse> = async (req, res) => {
    try {
      const appointments = await this.service.getAll();
      res.status(200).json({ appointments });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getById: ExpressHandler<GetAppointmentByIdRequest, GetAppointmentByIdResponse, GetAppointmentByIdParams> = async (
    req,
    res
  ) => {
    try {
      const id = parseInt(req.params.id);
      const appointment = await this.service.getById(id);
      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }
      res.status(200).json(appointment);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  create: ExpressHandler<CreateAppointmentRequest, CreateAppointmentResponse> = async (req, res) => {
    try {
      const appointment = await this.service.create(req.body as CreateAppointmentRequest);
      res.status(201).json(appointment);
    } catch (err: any) {
      res.status(400).json({ error: "Invalid request", details: err.message });
    }
  };

  update: ExpressHandler<UpdateAppointmentRequest, UpdateAppointmentResponse, UpdateAppointmentParams> = async (
    req,
    res
  ) => {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.service.update(id, req.body);
      if (!updated) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }
      res.status(200).json({ message: "Appointment updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  delete: ExpressHandler<DeleteAppointmentRequest, DeleteAppointmentResponse, DeleteAppointmentParams> = async (
    req,
    res
  ) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.service.delete(id);
      if (!deleted) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }
      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getByDoctorId: ExpressHandler<{}, { appointments: Appointment[] }, { id: string }> = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const appointments = await this.service.findByDoctorId(id);
      res.status(200).json({ appointments });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getByPatientId: ExpressHandler<{}, { appointments: Appointment[] }, { id: string }> = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const appointments = await this.service.findByPatientId(id);
      res.status(200).json({ appointments });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
