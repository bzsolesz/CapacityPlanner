package com.plm.child;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

@Component
public class ChildDaoImpl implements ChildDao {

    static final String GET_CHILD_BY_ID_QUERY = "select * from child where id = ?";
    public static final String CHILD_ID_COLUMN = "id";
    public static final String CHILD_FIRST_NAME_COLUMN = "first_name";
    public static final String CHILD_SURNAME_COLUMN = "surname";
    public static final String CHILD_DATE_OF_BIRTH_COLUMN = "date_of_birth";

    private String dbDriverClass;
    private String dbUrl;
    private String dbUsername;
    private String dbPassword;

    public ChildDaoImpl(
            @Value("${db.driver.class}") String dbDriverClass,
            @Value("${db.url}") String dbUrl,
            @Value("${db.username}") String dbUsername,
            @Value("${db.password}") String dbPassword) {

        this.dbDriverClass = dbDriverClass;
        this.dbUrl = dbUrl;
        this.dbUsername = dbUsername;
        this.dbPassword = dbPassword;
    }

    @Override
    public Child getChildById(int id) throws ResourceNotFoundException {

        try {
            registerDriverClass(dbDriverClass);
        } catch (ClassNotFoundException cnfe) {
            cnfe.printStackTrace();
            throw new RuntimeException("Database driver cannot be registered!");
        }

        try (
                Connection dbConnection = createDBConnection(dbUrl, dbUsername, dbPassword);
                PreparedStatement getChildByIdStatement = dbConnection.prepareStatement(GET_CHILD_BY_ID_QUERY);
            )
        {
            getChildByIdStatement.setInt(1, id);

            ResultSet resultSet = getChildByIdStatement.executeQuery();

            if (resultSet.first()) {

                int childId = resultSet.getInt(CHILD_ID_COLUMN);
                String firstName = resultSet.getString(CHILD_FIRST_NAME_COLUMN);
                String surname = resultSet.getString(CHILD_SURNAME_COLUMN);
                Date dateOfBirth = new Date(resultSet.getDate(CHILD_DATE_OF_BIRTH_COLUMN).getTime());

                return new Child(childId, firstName, surname, dateOfBirth);

            } else {
                throw new ResourceNotFoundException("Child was not found!");
            }
        } catch (SQLException sqle) {

            sqle.printStackTrace();

            throw new RuntimeException("Database query failed!");
        }
    }

    void registerDriverClass(String dbDriverClass) throws ClassNotFoundException {
        Class.forName(dbDriverClass);
    }

    Connection createDBConnection(String dbUrl, String dbUsername, String dbPassword) throws SQLException {
        return DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
    }
}
