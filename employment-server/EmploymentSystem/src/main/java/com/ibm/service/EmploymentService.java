package com.ibm.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.entity.Compesation;
import com.ibm.entity.Employee;
import com.ibm.repository.EmploymentRepository;

@Service
public class EmploymentService {

	@Autowired
	EmploymentRepository employeeRepository;

	public HashMap<String, Object> createEmployee(Employee employee) {
		HashMap<String, Object> map = new HashMap<>();

		if (employeeRepository.findByFirstNameAndMiddleNameAndLastNameAndBirthDate(employee.getFirstName(),
				employee.getMiddleName(), employee.getLastName(), employee.getBirthDate()).size() >= 1) {
			map.put("message", "employee already exists");
			map.put("code", 400);
			return map;
		} else {
			employeeRepository.save(employee);
			map.put("message", "employee saved");
			map.put("code", 200);
			return map;
		}

	}

	public HashMap<String, Object> updateEmployee(Employee employee) {
		HashMap<String, Object> map = new HashMap<>();

		if (employeeRepository.findByFirstNameAndMiddleNameAndLastNameAndBirthDate(employee.getFirstName(),
				employee.getMiddleName(), employee.getLastName(), employee.getBirthDate()).size() >= 1) {
			map.put("message", "employee already exists");
			map.put("code", 400);
			return map;
		} else {
			employeeRepository.save(employee);
			map.put("message", "employee updated");
			map.put("code", 200);
			return map;
		}
	}

	public HashMap<String, Object> updateEmployeeCompesation(Employee employee) {
		HashMap<String, Object> map = new HashMap<>();

		List<Compesation> compesations = employee.getCompesationList();
		boolean exists = false;
		for (Compesation c : compesations) {
			if (c.getType().equals("Salary")) {
				for (Compesation b : compesations) {
					if (b.getType().equals("Salary")) {
						if (!b.equals(c)) {
							if (b.getMonth() == c.getMonth() && b.getYear() == c.getYear()) {
								exists = true;
								break;
							}
						}
						if (exists)
							break;
					}
				}
			}
		}
		if (exists) {
			map.put("message", "compesation already exists");
			map.put("code", 400);
		} else {
			employeeRepository.save(employee);
			map.put("message", "employee updated");
			map.put("code", 200);
		}

		return map;
	}

	public Employee getEmployeeById(String id) {
		return employeeRepository.findById(id).get();
	}

	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	public List<Employee> getEmployeesByFields(String firstName, String lastName, String position) {
		if (firstName != "" && lastName != "" && position != "") {
			return employeeRepository.findByFirstNameAndLastNameAndPosition(firstName, lastName, position);
		} else if (firstName != "" && lastName != "") {
			return employeeRepository.findByFirstNameAndLastName(firstName, lastName);
		} else if (firstName != "" && position != "") {
			return employeeRepository.findByFirstNameAndPosition(firstName, position);
		} else if (lastName != "" && position != "") {
			return employeeRepository.findByLastNameAndPosition(lastName, position);
		} else if (firstName != "") {
			return employeeRepository.findByFirstName(firstName);
		} else if (lastName != "") {
			return employeeRepository.findByLastName(lastName);
		} else if (position != "") {
			return employeeRepository.findByPosition(position);
		} else
			return employeeRepository.findByFirstName(firstName);

	}

	public List<Employee> getByAllFields(Employee employee) {
		return employeeRepository.findByFirstNameAndMiddleNameAndLastNameAndBirthDate(employee.getFirstName(),
				employee.getMiddleName(), employee.getLastName(), employee.getBirthDate());
	}

}
