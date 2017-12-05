package com.plm.service.child.configuration;

import com.plm.service.child.AbstractITBase;
import com.plm.service.child.dao.ChildEntity;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.HttpHeaders;

import javax.transaction.Transactional;
import java.util.Date;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CorsFilterIT extends AbstractITBase {

    private static final Date TEST_DATE_OF_BIRTH = new Date();
    private static final String KNOWN_PROTOCOL = "http";
    private static final String KNOWN_HOST = "localhost";
    private static final int KNOWN_PORT = 88000;

    private Integer testChildId;

    @Before
    public void setUp() throws Exception {

        ChildEntity childEntity = new ChildEntity();
        childEntity.setDateOfBirth(TEST_DATE_OF_BIRTH);

        testChildId = (Integer) testEntityManager.persistAndGetId(childEntity);

        testEntityManager.flush();
    }

    @Test
    @Transactional
    public void shouldReturnOkToGetRequestFromKnownOrigin() throws Exception {

        String testOriginUrl = buildTestOriginUrl(KNOWN_PROTOCOL, KNOWN_HOST, KNOWN_PORT);

        mockMvc.perform(get("/child/{id}", testChildId)
                .header(HttpHeaders.ORIGIN, testOriginUrl)
                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, testOriginUrl));
    }

    @Test
    @Transactional
    public void shouldRejectGetRequestFromUnknownHost() throws Exception {

        String testOriginUrlWithUnknownHost = buildTestOriginUrl(KNOWN_PROTOCOL, "127.0.0.2", KNOWN_PORT);

        mockMvc.perform(get("/child/{id}", testChildId)
                .header(HttpHeaders.ORIGIN, testOriginUrlWithUnknownHost)
                .accept(APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    public void shouldRejectGetRequestFromUnknownPort() throws Exception {

        String testOriginUrlWithUnknownPort = buildTestOriginUrl(KNOWN_PROTOCOL, KNOWN_HOST, KNOWN_PORT + 1);

        mockMvc.perform(get("/child/{id}", testChildId)
                .header(HttpHeaders.ORIGIN, testOriginUrlWithUnknownPort)
                .accept(APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    public void shouldRejectGetRequestFromWithUnknownProtocol() throws Exception {

        String testOriginUrlWithUnknownProtocol = buildTestOriginUrl("https", KNOWN_HOST, KNOWN_PORT);

        mockMvc.perform(get("/child/{id}", testChildId)
                .header(HttpHeaders.ORIGIN, testOriginUrlWithUnknownProtocol)
                .accept(APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    private static String buildTestOriginUrl(String protocol, String host, int port) {
        return String.format("%s://%s:%d", protocol, host, port);
    }
}