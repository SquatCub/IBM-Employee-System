package com.ibm.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ibm.entity.Employee;

@Repository
public interface EmploymentRepository extends MongoRepository<Employee, String> {

	public List<Employee> findByFirstName(String firstName);
	public List<Employee> findByLastName(String lastName);
	public List<Employee> findByPosition(String position);
	
	public List<Employee> findByFirstNameAndLastName(String firstName, String lastName);
	public List<Employee> findByFirstNameAndPosition(String firstName, String position);
	public List<Employee> findByLastNameAndPosition(String lastName, String position);
	public List<Employee> findByFirstNameAndLastNameAndPosition(String firstName, String lastName, String position);
	
	public List<Employee> findByFirstNameAndMiddleNameAndLastNameAndBirthDate(String firstName, String middleName, String lastName, String birthDate);

	public Employee findByIdAndCompesationListMonthAndCompesationListYear(String id, int month, int year);
}
