import { Availability } from "../entities/Availability";
import { ParamsDictionary } from "express-serve-static-core";

export interface GetAllAvailabilitiesRequest {}
export interface GetAllAvailabilitiesResponse {
  availabilities: Availability[];
}

export interface GetAvailabilityByIdParams extends ParamsDictionary {
  id: string;
}
export interface GetAvailabilityByIdRequest {}
export interface GetAvailabilityByIdResponse extends Availability {}

export interface GetAvailabilityByDoctorIdParams {
  id: string;
}

export interface CreateAvailabilityRequest {
  doctorId: number;
  slots: Partial<Availability>[];
}
export interface CreateAvailabilityResponse {
  success: boolean;
  message: string;
  insertedCount: number;
}

export interface CreateBulkAvailabilityRequest {
  doctorId: number;
  slots: Partial<Availability>[];
}
export interface CreateBulkAvailabilityResponse {
  success: boolean;
  message: string;
  insertedCount: number;
}

export interface UpdateAvailabilityParams extends ParamsDictionary {
  id: string;
}
export interface UpdateAvailabilityRequest {
  booked: boolean;
}
export interface UpdateAvailabilityResponse {
  message: string;
}

export interface DeleteAvailabilityParams extends ParamsDictionary {
  id: string;
}
export interface DeleteAvailabilityRequest {}
export interface DeleteAvailabilityResponse {
  message: string;
}
