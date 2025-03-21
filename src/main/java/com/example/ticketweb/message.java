package com.example.ticketweb;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Table;

@Entity 
@Table(name = "konzert")
public class message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private String name;
private String email;

@ElementCollection
private List<String> days;

    public message() {}

    public message(String name, String email, List<String> days){
        this.name = name;
        this.email = email;
        this.days = days;
    }
        public String getName() {
            return name;
        }
        public void setName(String name){
            this.name =  name;
        }
        
        public String getEmail(){
            return email;
        }
        public void setEmail(String email){
            this.email =  email;
        }

        public List<String> getDays(){
            return days;
        }
        public void setDays(List<String> days){
            this.days = days;
        }

    @Converter
    public static class StringListConverter implements AttributeConverter<List<String>, String> {
        @Override
        public String convertToDatabaseColumn(List<String> list) {
            return list != null ? String.join(",", list) : "";
        }

        @Override
        public List<String> convertToEntityAttribute(String data) {
            return data != null && !data.isEmpty() ? Arrays.stream(data.split(",")).collect(Collectors.toList()) : null;
        }
    }
}
