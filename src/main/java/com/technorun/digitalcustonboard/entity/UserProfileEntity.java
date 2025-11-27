package com.technorun.digitalcustonboard.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_profile")
public class UserProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String password;
    private boolean emailVerified;

    // Add PAN field (searchable by repository)
    @Column(name = "pan", unique = true)
    private String pan;

    // documents
    @Lob
    private byte[] aadharCardDocs;

    @Lob
    private byte[] panCardDocs;

    @Lob
    private byte[] addressVerificationDocs;

    @Lob
    private byte[] signatureDocs;

    // owning side
    @OneToOne
    @JoinColumn(name = "user_details_id")  // FK in user_profile table
    private UserDetailsEntity userDetails;
}
